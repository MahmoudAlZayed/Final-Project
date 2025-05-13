/*LOGIN AND SHIPPING INFORMATION*/
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
);

/*ORDERS*/ 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
);

/*ORDER DETAILS*/
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
);

/*PRODUCT DETAILS*/
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    product_details TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    size_id INT,
    color_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id),
    FOREIGN KEY (color_id) REFERENCES colors(id),
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50),
);

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(10),
);

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(20),
);

insert into categories (id, category) values (1, 'Men''s Clothing');
insert into categories (id, category) values (2, 'Women''s Clothing');
insert into categories (id, category) values (3, 'Kid''s Clothing');
insert into categories (id, category) values (4, 'Accessories');
insert into categories (id, category) values (5, 'Footwear');
insert into categories (id, category) values (6, 'Sale & Clearance');
insert into categories (id, category) values (7, 'New Arrivals');
insert into categories (id, category) values (8, 'Trending Styles');

INSERT INTO sizes (id, size) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'XXL');

INSERT INTO colors (id, color) VALUES
(1, 'Black'),
(2, 'White'),
(3, 'Red'),
(4, 'Blue'),
(5, 'Green'),
(6, 'Gray'),
(7, 'Yellow'),
(8, 'Brown');