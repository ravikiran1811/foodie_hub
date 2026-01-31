-- ============================================
-- FOOD ORDERING ACL - COMPLETE DATABASE SETUP
-- ============================================
-- Drop all tables in correct order (reverse of dependencies)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role_acl_category_action_map CASCADE;
DROP TABLE IF EXISTS acl_action_category_map CASCADE;
DROP TABLE IF EXISTS acl_actions CASCADE;
DROP TABLE IF EXISTS acl_categories CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Drop types
DROP TYPE IF EXISTS order_status CASCADE;
DROP TYPE IF EXISTS payment_method_type CASCADE;
DROP TYPE IF EXISTS country CASCADE;

-- ============================================
-- CREATE TYPES
-- ============================================
CREATE TYPE country AS ENUM ('INDIA', 'AMERICA');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_method_type AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'WALLET');

-- ============================================
-- CREATE TABLES
-- ============================================

-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- ACL Categories table
CREATE TABLE acl_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- ACL Actions table
CREATE TABLE acl_actions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- ACL Action-Category mapping
CREATE TABLE acl_action_category_map (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES acl_categories(id) ON DELETE CASCADE,
    action_id INTEGER NOT NULL REFERENCES acl_actions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    UNIQUE(category_id, action_id)
);

-- Role ACL Category Action Map (Permissions)
CREATE TABLE role_acl_category_action_map (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES acl_categories(id) ON DELETE CASCADE,
    action_id INTEGER NOT NULL REFERENCES acl_actions(id) ON DELETE CASCADE,
    is_allowed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    UNIQUE(role_id, category_id, action_id)
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    country country NOT NULL DEFAULT 'INDIA',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- Restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    country VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
    status order_status NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT,
    special_instructions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- Order Items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER NOT NULL REFERENCES menu_items(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Payment Methods table
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type payment_method_type NOT NULL,
    label VARCHAR(255) NOT NULL,
    last_4_digits VARCHAR(4) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) NOT NULL,
    updated_by VARCHAR(255) NOT NULL
);

-- ============================================
-- INSERT SEED DATA
-- ============================================

-- Insert Roles
INSERT INTO roles (name, description, created_by, updated_by) VALUES
('Admin', 'Full system access with all permissions', 'system', 'system'),
('Manager', 'Restaurant and order management access', 'system', 'system'),
('Customer', 'Basic customer access for ordering', 'system', 'system'),
('IndiaManager', 'Manager with India-specific access', 'system', 'system'),
('AmericaManager', 'Manager with America-specific access', 'system', 'system');

-- Insert ACL Categories
INSERT INTO acl_categories (name, description, created_by, updated_by) VALUES
('ORDERS', 'Order management category', 'system', 'system'),
('PAYMENTS', 'Payment management category', 'system', 'system'),
('RESTAURANTS', 'Restaurant management category', 'system', 'system'),
('USERS', 'User management category', 'system', 'system'),
('DASHBOARD', 'Dashboard access category', 'system', 'system');

-- Insert ACL Actions
INSERT INTO acl_actions (code, name, description, created_by, updated_by) VALUES
('READ_001', 'Read', 'Read/View permission', 'system', 'system'),
('WRITE_001', 'Write', 'Create/Write permission', 'system', 'system'),
('UPDATE_001', 'Update', 'Update/Modify permission', 'system', 'system'),
('DELETE_001', 'Delete', 'Delete permission', 'system', 'system'),
('IMPORT_001', 'Import', 'Import data permission', 'system', 'system'),
('EXPORT_001', 'Export', 'Export data permission', 'system', 'system'),
('APPROVE_001', 'Approve', 'Approve permission', 'system', 'system'),
('REJECT_001', 'Reject', 'Reject permission', 'system', 'system');

-- Map Actions to Categories (All actions available for all categories)
INSERT INTO acl_action_category_map (category_id, action_id, created_by, updated_by)
SELECT c.id, a.id, 'system', 'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Permissions for Admin (Full access to everything)
INSERT INTO role_acl_category_action_map (role_id, category_id, action_id, is_allowed, created_by, updated_by)
SELECT 
    (SELECT id FROM roles WHERE name = 'Admin'),
    c.id,
    a.id,
    true,
    'system',
    'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Permissions for Manager
INSERT INTO role_acl_category_action_map (role_id, category_id, action_id, is_allowed, created_by, updated_by)
SELECT 
    (SELECT id FROM roles WHERE name = 'Manager'),
    c.id,
    a.id,
    CASE 
        WHEN c.name IN ('ORDERS', 'RESTAURANTS', 'DASHBOARD') AND a.code IN ('READ_001', 'WRITE_001', 'UPDATE_001') THEN true
        WHEN c.name = 'PAYMENTS' AND a.code IN ('READ_001', 'EXPORT_001') THEN true
        ELSE false
    END,
    'system',
    'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Permissions for Customer
INSERT INTO role_acl_category_action_map (role_id, category_id, action_id, is_allowed, created_by, updated_by)
SELECT 
    (SELECT id FROM roles WHERE name = 'Customer'),
    c.id,
    a.id,
    CASE 
        WHEN c.name = 'ORDERS' AND a.code IN ('READ_001', 'WRITE_001') THEN true
        WHEN c.name = 'RESTAURANTS' AND a.code = 'READ_001' THEN true
        WHEN c.name = 'PAYMENTS' AND a.code IN ('READ_001', 'WRITE_001') THEN true
        WHEN c.name = 'DASHBOARD' AND a.code = 'READ_001' THEN true
        ELSE false
    END,
    'system',
    'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Permissions for IndiaManager (same as Manager)
INSERT INTO role_acl_category_action_map (role_id, category_id, action_id, is_allowed, created_by, updated_by)
SELECT 
    (SELECT id FROM roles WHERE name = 'IndiaManager'),
    c.id,
    a.id,
    CASE 
        WHEN c.name IN ('ORDERS', 'RESTAURANTS', 'DASHBOARD') AND a.code IN ('READ_001', 'WRITE_001', 'UPDATE_001') THEN true
        WHEN c.name = 'PAYMENTS' AND a.code IN ('READ_001', 'EXPORT_001') THEN true
        ELSE false
    END,
    'system',
    'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Permissions for AmericaManager (same as Manager)
INSERT INTO role_acl_category_action_map (role_id, category_id, action_id, is_allowed, created_by, updated_by)
SELECT 
    (SELECT id FROM roles WHERE name = 'AmericaManager'),
    c.id,
    a.id,
    CASE 
        WHEN c.name IN ('ORDERS', 'RESTAURANTS', 'DASHBOARD') AND a.code IN ('READ_001', 'WRITE_001', 'UPDATE_001') THEN true
        WHEN c.name = 'PAYMENTS' AND a.code IN ('READ_001', 'EXPORT_001') THEN true
        ELSE false
    END,
    'system',
    'system'
FROM acl_categories c
CROSS JOIN acl_actions a;

-- Insert Users (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password, role_id, country, created_by, updated_by) VALUES
('Admin User', 'admin@foodorder.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'Admin'), 'INDIA', 'system', 'system'),
('Manager User', 'manager@foodorder.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'Manager'), 'INDIA', 'system', 'system'),
('Customer User', 'customer@foodorder.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'Customer'), 'INDIA', 'system', 'system'),
('India Manager', 'india.manager@foodorder.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'IndiaManager'), 'INDIA', 'system', 'system'),
('America Manager', 'america.manager@foodorder.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'AmericaManager'), 'AMERICA', 'system', 'system'),
('John Doe', 'john@example.com', '$2b$10$V/JNlVUl0npf2f5SYutBnO7InrW7EZ4m/WGP4qLclD36EoX92zEOS', (SELECT id FROM roles WHERE name = 'Customer'), 'AMERICA', 'system', 'system');

-- Insert Restaurants
INSERT INTO restaurants (name, description, address, country, image_url, is_active) VALUES
('Spice Paradise', 'Authentic Indian cuisine with traditional flavors', '123 MG Road, Bangalore, Karnataka', 'INDIA', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', true),
('Curry House', 'North Indian specialties and tandoor delights', '45 Connaught Place, New Delhi', 'INDIA', 'https://images.unsplash.com/photo-1552566626-52f8b828add9', true),
('Dosa Corner', 'South Indian breakfast and snacks', '78 Brigade Road, Bangalore', 'INDIA', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', true),
('American Diner', 'Classic American burgers and fries', '100 Broadway, New York, NY', 'AMERICA', 'https://images.unsplash.com/photo-1521017432531-fbd92d768814', true),
('Texas BBQ', 'Smoked meats and BBQ specialties', '200 Main St, Austin, TX', 'AMERICA', 'https://images.unsplash.com/photo-1544025162-d76694265947', true),
('Pizza Palace', 'New York style pizza and Italian dishes', '300 5th Avenue, New York, NY', 'AMERICA', 'https://images.unsplash.com/photo-1513104890138-7c749659a591', true);

-- Insert Menu Items for Indian Restaurants
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available) VALUES
-- Spice Paradise (ID: 1)
(1, 'Butter Chicken', 'Creamy tomato-based curry with tender chicken', 350.00, 'Main Course', true),
(1, 'Paneer Tikka', 'Marinated cottage cheese grilled to perfection', 280.00, 'Appetizer', true),
(1, 'Garlic Naan', 'Fresh naan bread with garlic and butter', 60.00, 'Bread', true),
(1, 'Biryani', 'Fragrant basmati rice with spices and meat', 400.00, 'Main Course', true),
(1, 'Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 80.00, 'Dessert', true),

-- Curry House (ID: 2)
(2, 'Tandoori Chicken', 'Marinated chicken cooked in clay oven', 380.00, 'Main Course', true),
(2, 'Dal Makhani', 'Creamy black lentils slow-cooked overnight', 250.00, 'Main Course', true),
(2, 'Samosa', 'Crispy pastry filled with spiced potatoes', 50.00, 'Appetizer', true),
(2, 'Rogan Josh', 'Aromatic lamb curry from Kashmir', 450.00, 'Main Course', true),
(2, 'Mango Lassi', 'Sweet yogurt drink with mango', 100.00, 'Beverage', true),

-- Dosa Corner (ID: 3)
(3, 'Masala Dosa', 'Crispy rice crepe with potato filling', 120.00, 'Main Course', true),
(3, 'Idli Sambhar', 'Steamed rice cakes with lentil soup', 80.00, 'Main Course', true),
(3, 'Vada', 'Crispy lentil donuts', 60.00, 'Appetizer', true),
(3, 'Filter Coffee', 'Traditional South Indian coffee', 40.00, 'Beverage', true),
(3, 'Uttapam', 'Thick rice pancake with vegetables', 100.00, 'Main Course', true);

-- Insert Menu Items for American Restaurants
INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available) VALUES
-- American Diner (ID: 4)
(4, 'Classic Burger', 'Beef patty with lettuce, tomato, and cheese', 12.99, 'Main Course', true),
(4, 'French Fries', 'Crispy golden fries', 4.99, 'Side', true),
(4, 'Milkshake', 'Thick vanilla milkshake', 5.99, 'Beverage', true),
(4, 'Caesar Salad', 'Romaine lettuce with Caesar dressing', 8.99, 'Salad', true),
(4, 'Apple Pie', 'Classic American apple pie', 6.99, 'Dessert', true),

-- Texas BBQ (ID: 5)
(5, 'BBQ Ribs', 'Slow-smoked pork ribs with BBQ sauce', 22.99, 'Main Course', true),
(5, 'Brisket', 'Smoked beef brisket sliced thin', 18.99, 'Main Course', true),
(5, 'Coleslaw', 'Creamy cabbage salad', 3.99, 'Side', true),
(5, 'Cornbread', 'Sweet cornbread muffins', 4.99, 'Side', true),
(5, 'Pecan Pie', 'Southern pecan pie', 7.99, 'Dessert', true),

-- Pizza Palace (ID: 6)
(6, 'Margherita Pizza', 'Fresh mozzarella and basil pizza', 14.99, 'Main Course', true),
(6, 'Pepperoni Pizza', 'Classic pepperoni pizza', 16.99, 'Main Course', true),
(6, 'Garlic Bread', 'Toasted bread with garlic butter', 5.99, 'Appetizer', true),
(6, 'Spaghetti Carbonara', 'Pasta with bacon and cream sauce', 15.99, 'Main Course', true),
(6, 'Tiramisu', 'Italian coffee-flavored dessert', 7.99, 'Dessert', true);

-- Insert Sample Orders
INSERT INTO orders (user_id, restaurant_id, status, total_amount, delivery_address, special_instructions, created_by, updated_by) VALUES
(3, 1, 'DELIVERED', 950.00, '123 Customer Street, Bangalore', 'Extra spicy please', 'customer@foodorder.com', 'customer@foodorder.com'),
(6, 4, 'PENDING', 35.96, '456 Main St, New York, NY', 'No onions', 'john@example.com', 'john@example.com'),
(3, 3, 'CONFIRMED', 280.00, '123 Customer Street, Bangalore', NULL, 'customer@foodorder.com', 'customer@foodorder.com');

-- Insert Order Items
INSERT INTO order_items (order_id, menu_item_id, quantity, price, subtotal) VALUES
-- Order 1
(1, 1, 2, 350.00, 700.00),
(1, 3, 2, 60.00, 120.00),
(1, 5, 2, 80.00, 160.00),
-- Order 2
(2, 21, 2, 12.99, 25.98),
(2, 22, 2, 4.99, 9.98),
-- Order 3
(3, 11, 2, 120.00, 240.00),
(3, 14, 1, 40.00, 40.00);

-- Insert Payment Methods
INSERT INTO payment_methods (user_id, type, label, last_4_digits, is_active, created_by, updated_by) VALUES
(3, 'CREDIT_CARD', 'HDFC Credit Card', '1234', true, 'customer@foodorder.com', 'customer@foodorder.com'),
(3, 'UPI', 'PhonePe', '9876', true, 'customer@foodorder.com', 'customer@foodorder.com'),
(6, 'CREDIT_CARD', 'Chase Visa', '5678', true, 'john@example.com', 'john@example.com'),
(6, 'DEBIT_CARD', 'Bank of America', '9012', true, 'john@example.com', 'john@example.com');

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_restaurants_country ON restaurants(country);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payment_methods_user ON payment_methods(user_id);
CREATE INDEX idx_permissions_role ON role_acl_category_action_map(role_id);
CREATE INDEX idx_permissions_category ON role_acl_category_action_map(category_id);
CREATE INDEX idx_permissions_action ON role_acl_category_action_map(action_id);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Uncomment to verify the data

-- SELECT 'Roles Count:', COUNT(*) FROM roles;
-- SELECT 'Categories Count:', COUNT(*) FROM acl_categories;
-- SELECT 'Actions Count:', COUNT(*) FROM acl_actions;
-- SELECT 'Permissions Count:', COUNT(*) FROM role_acl_category_action_map;
-- SELECT 'Users Count:', COUNT(*) FROM users;
-- SELECT 'Restaurants Count:', COUNT(*) FROM restaurants;
-- SELECT 'Menu Items Count:', COUNT(*) FROM menu_items;
-- SELECT 'Orders Count:', COUNT(*) FROM orders;
-- SELECT 'Order Items Count:', COUNT(*) FROM order_items;
-- SELECT 'Payment Methods Count:', COUNT(*) FROM payment_methods;

-- ============================================
-- SETUP COMPLETE
-- ============================================
