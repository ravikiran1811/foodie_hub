import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AclCategory } from '../../entities/acl-category.entity';
import { AclAction } from '../../entities/acl-action.entity';
import { AclActionCategoryMap } from '../../entities/acl-action-category-map.entity';
import { Role } from '../../entities/role.entity';
import { RoleAclCategoryActionMap } from '../../entities/role-acl-category-action-map.entity';
import { User, Country } from '../../entities/user.entity';
import { Restaurant } from '../../entities/restaurant.entity';
import { MenuItem } from '../../entities/menu-item.entity';
import dataSource from '../../config/typeorm.config';

async function seed() {
  await dataSource.initialize();

  const categoryRepo = dataSource.getRepository(AclCategory);
  const actionRepo = dataSource.getRepository(AclAction);
  const actionCategoryMapRepo = dataSource.getRepository(AclActionCategoryMap);
  const roleRepo = dataSource.getRepository(Role);
  const rolePermissionRepo = dataSource.getRepository(RoleAclCategoryActionMap);
  const userRepo = dataSource.getRepository(User);
  const restaurantRepo = dataSource.getRepository(Restaurant);
  const menuItemRepo = dataSource.getRepository(MenuItem);

  console.log('🌱 Starting database seed...');

  // 1. Seed ACL Categories
  console.log('📂 Seeding ACL Categories...');
  const categories = await categoryRepo.save([
    {
      name: 'Orders',
      categoryKey: 'ORDERS',
      description: 'Order management permissions',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Payments',
      categoryKey: 'PAYMENTS',
      description: 'Payment management permissions',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Restaurants',
      categoryKey: 'RESTAURANTS',
      description: 'Restaurant management permissions',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Users',
      categoryKey: 'USERS',
      description: 'User management permissions',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Dashboard',
      categoryKey: 'DASHBOARD',
      description: 'Dashboard access permissions',
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  // 2. Seed ACL Actions
  console.log('⚡ Seeding ACL Actions...');
  const actions = await actionRepo.save([
    {
      name: 'Read',
      actionKey: 'READ',
      description: 'Permission to view/read resources',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Write',
      actionKey: 'WRITE',
      description: 'Permission to create resources',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Update',
      actionKey: 'UPDATE',
      description: 'Permission to modify resources',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Delete',
      actionKey: 'DELETE',
      description: 'Permission to delete resources',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Import',
      actionKey: 'IMPORT',
      description: 'Permission to import data',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Export',
      actionKey: 'EXPORT',
      description: 'Permission to export data',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Approve',
      actionKey: 'APPROVE',
      description: 'Permission to approve requests',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Reject',
      actionKey: 'REJECT',
      description: 'Permission to reject requests',
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  // 3. Map Actions to Categories
  console.log('🔗 Mapping Actions to Categories...');
  const categoryActionMaps = [];

  // ORDERS: READ, WRITE, UPDATE, DELETE
  const ordersCategory = categories.find((c) => c.categoryKey === 'ORDERS');
  categoryActionMaps.push(
    ...['READ', 'WRITE', 'UPDATE', 'DELETE'].map((actionKey) => ({
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === actionKey).id,
      createdBy: 'system',
      updatedBy: 'system',
    })),
  );

  // PAYMENTS: READ, WRITE, UPDATE
  const paymentsCategory = categories.find((c) => c.categoryKey === 'PAYMENTS');
  categoryActionMaps.push(
    ...['READ', 'WRITE', 'UPDATE'].map((actionKey) => ({
      categoryId: paymentsCategory.id,
      actionId: actions.find((a) => a.actionKey === actionKey).id,
      createdBy: 'system',
      updatedBy: 'system',
    })),
  );

  // RESTAURANTS: READ
  const restaurantsCategory = categories.find((c) => c.categoryKey === 'RESTAURANTS');
  categoryActionMaps.push({
    categoryId: restaurantsCategory.id,
    actionId: actions.find((a) => a.actionKey === 'READ').id,
    createdBy: 'system',
    updatedBy: 'system',
  });

  // USERS: READ, UPDATE
  const usersCategory = categories.find((c) => c.categoryKey === 'USERS');
  categoryActionMaps.push(
    ...['READ', 'UPDATE'].map((actionKey) => ({
      categoryId: usersCategory.id,
      actionId: actions.find((a) => a.actionKey === actionKey).id,
      createdBy: 'system',
      updatedBy: 'system',
    })),
  );

  // DASHBOARD: READ
  const dashboardCategory = categories.find((c) => c.categoryKey === 'DASHBOARD');
  categoryActionMaps.push({
    categoryId: dashboardCategory.id,
    actionId: actions.find((a) => a.actionKey === 'READ').id,
    createdBy: 'system',
    updatedBy: 'system',
  });

  await actionCategoryMapRepo.save(categoryActionMaps);

  // 4. Seed Roles
  console.log('👥 Seeding Roles...');
  const roles = await roleRepo.save([
    {
      name: 'ADMIN',
      description: 'Administrator with full access',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'MANAGER',
      description: 'Manager with limited administrative access',
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'MEMBER',
      description: 'Regular member with basic access',
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  // 5. Assign Permissions to Roles
  console.log('🔐 Assigning Permissions to Roles...');

  const adminRole = roles.find((r) => r.name === 'ADMIN');
  const managerRole = roles.find((r) => r.name === 'MANAGER');
  const memberRole = roles.find((r) => r.name === 'MEMBER');

  const rolePermissions = [];

  // ADMIN - Full access to everything
  for (const category of categories) {
    for (const action of actions) {
      const mapExists = await actionCategoryMapRepo.findOne({
        where: { categoryId: category.id, actionId: action.id },
      });
      if (mapExists) {
        rolePermissions.push({
          roleId: adminRole.id,
          categoryId: category.id,
          actionId: action.id,
          isAllowed: true,
          createdBy: 'system',
          updatedBy: 'system',
        });
      }
    }
  }

  // MANAGER - Can view, create, update, cancel orders; view restaurants; NO payment management
  rolePermissions.push(
    {
      roleId: managerRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: managerRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'WRITE').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: managerRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'UPDATE').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: managerRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'DELETE').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: managerRole.id,
      categoryId: restaurantsCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: managerRole.id,
      categoryId: dashboardCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
  );

  // MEMBER - Can view restaurants, create orders; NO checkout, cancel, or payment management
  rolePermissions.push(
    {
      roleId: memberRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: memberRole.id,
      categoryId: ordersCategory.id,
      actionId: actions.find((a) => a.actionKey === 'WRITE').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: memberRole.id,
      categoryId: restaurantsCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      roleId: memberRole.id,
      categoryId: dashboardCategory.id,
      actionId: actions.find((a) => a.actionKey === 'READ').id,
      isAllowed: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
  );

  await rolePermissionRepo.save(rolePermissions);

  // 6. Seed Users
  console.log('👤 Seeding Users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await userRepo.save([
    {
      name: 'Admin User',
      email: 'admin@food.com',
      password: hashedPassword,
      roleId: adminRole.id,
      country: Country.INDIA,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Manager User',
      email: 'manager@food.com',
      password: hashedPassword,
      roleId: managerRole.id,
      country: Country.INDIA,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Member User',
      email: 'member@food.com',
      password: hashedPassword,
      roleId: memberRole.id,
      country: Country.INDIA,
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  // 7. Seed Restaurants
  console.log('🍴 Seeding Restaurants...');
  const restaurants = await restaurantRepo.save([
    {
      name: 'Spice Garden',
      description: 'Authentic Indian cuisine with a modern twist',
      address: '123 MG Road, Bangalore, Karnataka',
      country: Country.INDIA,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      isActive: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Dosa Palace',
      description: 'Traditional South Indian breakfast and snacks',
      address: '45 Brigade Road, Bangalore, Karnataka',
      country: Country.INDIA,
      imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
      isActive: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'Biryani House',
      description: 'Famous for Hyderabadi Biryani and Kebabs',
      address: '78 Indiranagar, Bangalore, Karnataka',
      country: Country.INDIA,
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      isActive: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  // 8. Seed Menu Items
  console.log('📜 Seeding Menu Items...');
  const spiceGarden = restaurants[0];
  const dosaPalace = restaurants[1];
  const biryaniHouse = restaurants[2];

  await menuItemRepo.save([
    // Spice Garden Menu
    {
      restaurantId: spiceGarden.id,
      name: 'Butter Chicken',
      description: 'Tender chicken in rich tomato cream sauce',
      price: 350,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
      category: 'Main Course',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: spiceGarden.id,
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with spices',
      price: 280,
      imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8',
      category: 'Appetizer',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: spiceGarden.id,
      name: 'Garlic Naan',
      description: 'Soft bread with garlic and butter',
      price: 60,
      imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db',
      category: 'Bread',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    // Dosa Palace Menu
    {
      restaurantId: dosaPalace.id,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe with spiced potato filling',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc',
      category: 'Main Course',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: dosaPalace.id,
      name: 'Idli Sambar',
      description: 'Steamed rice cakes with lentil soup',
      price: 80,
      imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
      category: 'Breakfast',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: dosaPalace.id,
      name: 'Filter Coffee',
      description: 'Traditional South Indian coffee',
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
      category: 'Beverage',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    // Biryani House Menu
    {
      restaurantId: biryaniHouse.id,
      name: 'Chicken Biryani',
      description: 'Aromatic rice with tender chicken and spices',
      price: 300,
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      category: 'Main Course',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: biryaniHouse.id,
      name: 'Mutton Seekh Kebab',
      description: 'Grilled minced mutton on skewers',
      price: 380,
      imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143',
      category: 'Appetizer',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      restaurantId: biryaniHouse.id,
      name: 'Raita',
      description: 'Yogurt with cucumber and spices',
      price: 70,
      imageUrl: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0',
      category: 'Side Dish',
      isAvailable: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${categories.length} Categories`);
  console.log(`   - ${actions.length} Actions`);
  console.log(`   - ${roles.length} Roles`);
  console.log(`   - ${users.length} Users`);
  console.log(`   - ${restaurants.length} Restaurants`);
  console.log(`   - Menu items seeded`);
  console.log('\n🔑 Test Credentials:');
  console.log('   Admin:   admin@food.com / password123');
  console.log('   Manager: manager@food.com / password123');
  console.log('   Member:  member@food.com / password123');

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
