CREATE TABLE customers (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    adress VARCHAR(100),
    phone_number VARCHAR(15)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    total_price DECIMAL(10, 2)
);

CREATE TABLE order_details (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(100),
    product_details TEXT,
    price DECIMAL(10, 2),
    category_id INT,
    size_id INT,
    color_id INT,
    quantity INT
);

CREATE TABLE categories (
    id INT PRIMARY KEY,
    category VARCHAR(50)
);

CREATE TABLE sizes (
    id INT PRIMARY KEY,
    size VARCHAR(10)
);

CREATE TABLE colors (
    id INT PRIMARY KEY,
    color VARCHAR(20)
);