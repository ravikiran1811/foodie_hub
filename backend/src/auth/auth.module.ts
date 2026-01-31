import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { RoleAclCategoryActionMap } from '../entities/role-acl-category-action-map.entity';
import { JwtAuthGuard } from './guards/gql-auth.guard';
import { AclGuard } from './guards/acl.guard';
import { CountryAccessGuard } from './guards/country-access.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, RoleAclCategoryActionMap]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, AclGuard, CountryAccessGuard],
  exports: [
    JwtAuthGuard,
    AclGuard,
    CountryAccessGuard,
    JwtModule,
    TypeOrmModule,
  ],
})
export class AuthModule {}
