CREATE TABLE customers (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    adress VARCHAR(100),
    city_id VARCHAR(50),
    zip_code VARCHAR(10),
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

CREATE TABLE cities (
    id INT PRIMARY KEY,
    city VARCHAR(50)
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

INSERT INTO cities (id, city) VALUES
(1, 'Stockholm'),
(2, 'Göteborg'),
(3, 'Malmö'),
(4, 'Uppsala'),
(5, 'Linköping'),
(6, 'Västerås'),
(7, 'Örebro'),
(8, 'Helsingborg'),
(9, 'Jönköping'),
(10, 'Norrköping'),
(11, 'Umeå'),
(12, 'Lund'),
(13, 'Borås'),
(14, 'Huddinge'),
(15, 'Nacka'),
(16, 'Eskilstuna'),
(17, 'Halmstad'),
(18, 'Gävle'),
(19, 'Södertälje'),
(20, 'Haninge'),
(21, 'Sundsvall'),
(22, 'Växjö'),
(23, 'Karlstad'),
(24, 'Botkyrka'),
(25, 'Järfälla'),
(26, 'Kristianstad'),
(27, 'Kungsbacka'),
(28, 'Solna'),
(29, 'Luleå'),
(30, 'Skellefteå'),
(31, 'Täby'),
(32, 'Sollentuna'),
(33, 'Kalmar'),
(34, 'Mölndal'),
(35, 'Varberg'),
(36, 'Norrtälje'),
(37, 'Karlskrona'),
(38, 'Östersund'),
(39, 'Gotland'),
(40, 'Falun'),
(41, 'Trollhättan'),
(42, 'Nyköping'),
(43, 'Skövde'),
(44, 'Uddevalla'),
(45, 'Sundbyberg'),
(46, 'Örnsköldsvik'),
(47, 'Sigtuna'),
(48, 'Hässleholm'),
(49, 'Borlänge'),
(50, 'Upplands Väsby');
