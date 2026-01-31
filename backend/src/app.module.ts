import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { OrderModule } from './orders/order.module';
import { PaymentModule } from './payments/payment.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './entities/user.entity';
import { AclAction } from './entities/acl-action.entity';
import { AclActionCategoryMap } from './entities/acl-action-category-map.entity';
import { AclCategory } from './entities/acl-category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RoleAclCategoryActionMap } from './entities/role-acl-category-action-map.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_DATABASE'),
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
            User,
            AclAction,
            AclActionCategoryMap,
            AclCategory,
            MenuItem,
            Order,
            OrderItem,
            PaymentMethod,
            Restaurant,
            RoleAclCategoryActionMap,
            Role, 
        ],
        synchronize: false, // Set to false to prevent schema changes
        logging: true, // Enable logging to see queries
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RestaurantModule,
    OrderModule,
    PaymentModule,
    PermissionsModule,
    DashboardModule,
  ],
})
export class AppModule {}
