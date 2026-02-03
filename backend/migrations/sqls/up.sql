/* 1. Create the USERS table first (it has no dependencies) */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    role varchar(50)

);

/* 2. Create the PRODUCTS table (it has no dependencies) */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    category VARCHAR(100),
    stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0)
);

/* 3. Create the ORDERS table */
/* Dependecy: Links to users via user_id */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(50)
);

/* 4. Create the ORDER_PRODUCTS table */
/* Dependency: Links to BOTH orders and products */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER
);




