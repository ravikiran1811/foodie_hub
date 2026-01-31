import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Country } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { RoleAclCategoryActionMap } from '../entities/role-acl-category-action-map.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthResponse, UserPermissionsResponse, PermissionNode } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RoleAclCategoryActionMap)
    private rolePermissionRepo: Repository<RoleAclCategoryActionMap>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      const { name, email, password, roleName, country } = registerDto;

      // Check if user exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Find role
      const role = await this.roleRepository.findOne({ where: { name: roleName } });
      if (!role) {
        throw new UnauthorizedException('Invalid role');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        roleId: role.id,
        country: country || Country.INDIA,
        createdBy: email,
        updatedBy: email,
      });

      const savedUser = await this.userRepository.save(user);

      // Generate JWT
      const payload = {
        sub: savedUser.id,
        email: savedUser.email,
        roleId: savedUser.roleId,
        country: savedUser.country,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          roleId: savedUser.roleId,
          country: savedUser.country,
        },
      };
    } catch (error) {
      console.error('Error in register:', error);
      if (error instanceof ConflictException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Registration failed. Please try again.');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const { email, password } = loginDto;
      
      console.log('🔍 Login attempt with email:', email);
      
      // Find user
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['role'],
      });

      console.log('👤 User found:', user ? `Yes (ID: ${user.id})` : 'No');

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT
      const payload = {
        sub: user.id,
        email: user.email,
        roleId: user.roleId,
        country: user.country,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          country: user.country,
        },
      };
    } catch (error) {
      console.error('Error in login:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed. Please try again.');
    }
  }

  async getUserPermissions(userId: number): Promise<UserPermissionsResponse> {
    try {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Fetch all permissions for the user's role
    const permissions = await this.rolePermissionRepo.find({
      where: { roleId: user.roleId, isAllowed: true },
      relations: ['category', 'action'],
    });

    // Build the permission response in the required format
    const permissionMap: Record<string, PermissionNode> = {};

    permissions.forEach((perm) => {
      const categoryKey = perm.category.categoryKey; // Use 'name' instead of 'categoryKey'
      const actionKey = perm.action.actionKey; // Use 'code' instead of 'actionKey'

      if (!permissionMap[categoryKey]) {
        permissionMap[categoryKey] = {
          parent: categoryKey,
        };
      }

      // Map action keys directly (they already have _001 format in database)
      permissionMap[categoryKey][actionKey] = true;
    });

    return {
      access: {
        iWork: permissionMap as any,
      },
    };
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Failed to fetch permissions. Please try again.');
    }
  }
}
