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
    phone_number VARCHAR(15) NOT NULL
	);

/*ORDERS*/ 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
	);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    subcategory VARCHAR(20) NOT NULL
);

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(10) NOT NULL
);

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(20) NOT NULL
);

/*PRODUCT DETAILS*/
CREATE TABLE products_type (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    img_url VARCHAR(100),
    product_details TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    subcategory_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);

CREATE TABLE products_list (
    id SERIAL PRIMARY KEY,
    product INT,
    size_id INT,
    color_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (color_id) REFERENCES colors(id),
    FOREIGN KEY (product) REFERENCES products_type(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

/*ORDER DETAILS*/
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products_list(id)
	);

insert into categories (id, category) values (1, 'Mens');
insert into categories (id, category) values (2, 'Womans');
insert into categories (id, category) values (3, 'Kids');
insert into categories (id, category) values (4, 'Accessories');
insert into categories (id, category) values (5, 'Footwear');

INSERT INTO subcategories (id, subcategory) VALUES
(1, 'Tops'),
(2, 'Bottom'),
(3, 'Underware'),
(4, 'Glasses'),
(5, 'Jewlery'),
(6, 'Bags'),
(7, 'Sneakers'),
(8, 'Pumps'),
(9, 'Boots');

INSERT INTO sizes (id, size) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'XXL'),
(7, 'onesize');

INSERT INTO colors (id, color) VALUES
(1, 'Black'),
(2, 'White'),
(3, 'Red'),
(4, 'Blue'),
(5, 'Green'),
(6, 'Gray'),
(7, 'Yellow'),
(8, 'Brown');

INSERT INTO products_type (id, product_name, img_url, product_details, price, category_id, subcategory_id) VALUES
(1, 'Mens t-shirt', 'img', 'A mens t-shirt', 10.99, 1, 1),
(2, 'Mens classic shirt', 'img', 'A classic shirt for weddings and workintervjues', 10.99, 1, 1),
(3, 'Mens cool t-shirt', 'img', 'A cool manly mens t-shirt', 20.99, 1, 1),
(4, 'SUPERSLIM MAN LEATHERPANTS', 'img', 'A pair of superslim black leatherpants for cool bikers and wannabe rockstars!', 79.99, 1, 2),
(5, 'Cargopants', 'img', 'A pair of cargopants.', 79.99, 1, 2),
(6, 'Jeans', 'img', 'A pair baggy.', 79.99, 1, 2),
(7, 'Men underware', 'img', 'A pair of superslim underware', 3.99, 1, 3),
(8, 'Womans Tanktop', 'img', 'A classic tanktop', 10.99, 2, 1),
(9, 'Womans T-shirt', 'img', 'A t-shirt', 10.99, 2, 1),
(10, 'Womans shirt', 'img', 'A shirt for the ladies', 10.99, 2, 1),
(11, 'Womanpants', 'img', 'A feminin pair of womanpants', 2.99, 2, 2),
(12, 'Womanskirt', 'img', 'A feminin pair of Womanskirt', 12.99, 2, 2),
(13, 'Womanjeans', 'img', 'A feminin pair of Womanjeans', 22.99, 2, 2),
(14, 'Woman underware', 'img', 'A pair of woman underware', 1.99, 2, 3),
(15, 'Children shirt', 'img', 'A cute funny shirt', 100.99, 3, 1),
(16, 'Children tshirt', 'img', 'A soft tshirt for a soft child', 100.99, 3, 1),
(17, 'Children onepice', 'img', 'A cozy onepice for all children', 100.99, 3, 1),
(18, 'Children pants', 'img', 'Perfect pants for every occasions', 100.99, 3, 2),
(19, 'Children jeans', 'img', 'Perfect pants for every occasions', 100.99, 3, 2),
(20, 'Children shortpants', 'img', 'Perfect pants for every summer day', 100.99, 3, 2),
(21, 'Sunglasses', 'img', 'For sunnydays and hungoverdays', 100.99, 4, 4),
(22, 'Diamondring', 'img', 'Get some ice on those fingers', 100.99, 4, 5),
(23, 'Goldchain', 'img', 'When you need som rizzle fo yo dizzle zizzle', 999.99, 4, 5),
(24, 'Rubberboots', 'img', 'For rainy days and fishing activites', 100.99, 5, 9),
(25, 'Boots', 'img', 'For hicking up the hills and marching down the streets', 50.99, 5, 9),
(26, 'Sneakers', 'img', 'Classic sneakers for your feet. Colour:', 10.99, 5, 7),
(27, 'Pumps', 'img', 'This is a pair of pumps.', 100.99, 5, 8);


INSERT INTO products_list (product, size_id, color_id, quantity) VALUES
(1,2,2,10),
(1,3,2,10),
(1,4,2,10),
(1,5,2,10),
(1,2,3,10),
(1,3,3,10),
(1,4,3,10),
(1,5,3,10),
(1,2,4,10),
(1,3,4,10),
(1,4,4,10),
(1,5,4,10),
(2,2,1,10),
(2,3,1,10),
(2,4,1,10),
(2,5,1,10),
(2,2,2,10),
(2,3,2,10),
(2,4,2,10),
(2,5,2,10),
(3,1,1,3),
(3,5,1,5),
(3,6,1,25),
(4,1,1,2),
(4,6,1,2),
(5,2,5,3),
(5,4,5,8),
(5,5,5,15),
(5,6,5,13),
(5,2,8,2),
(5,4,8,17),
(5,5,8,42),
(5,6,8,7),
(6,1,4,15),
(6,2,4,20),
(6,3,4,12),
(6,5,4,3),
(7,6,2,115),
(7,5,2,20),
(7,1,2,10),
(7,2,2,43),
(8,1,1,10),
(8,2,1,12),
(8,3,1,12),
(8,4,1,12),
(8,1,2,10),
(8,2,2,8),
(8,3,2,9),
(8,4,2,11),
(9,5,3,14),
(9,2,3,10),
(9,3,3,2),
(9,4,3,0),
(9,5,7,1),
(9,2,7,0),
(9,3,7,0),
(9,4,7,0),
(9,5,8,1),
(9,2,8,32),
(9,3,8,2),
(9,4,8,2),
(10,1,2,5),
(10,2,2,5),
(10,3,2,5),
(10,1,1,5),
(10,2,1,5),
(10,3,1,5),
(10,1,1,5),
(10,2,1,5),
(10,3,1,5),
(11,1,1,5),
(11,2,7,2),
(11,3,4,1),
(12,1,6,1),
(12,2,6,1),
(12,3,6,1),
(13,1,4,10),
(13,2,4,10),
(13,3,4,10),
(13,4,4,14),
(13,5,4,14),
(13,6,4,14),
(14,1,2,5),
(14,2,2,5),
(14,3,2,1),
(14,4,2,5),
(14,5,2,6),
(14,6,2,3),
(15,1,3,100),
(15,2,3,100),
(15,3,3,100),
(15,1,5,100),
(15,2,5,100),
(15,3,5,100),
(15,1,7,100),
(15,2,7,100),
(15,3,7,100),
(16,1,1,20),
(16,2,1,20),
(16,3,1,20),
(16,1,2,20),
(16,2,2,20),
(16,3,2,20),
(16,1,3,20),
(16,2,3,20),
(16,3,3,20),
(16,1,4,20),
(16,2,4,20),
(16,3,4,20),
(16,1,5,20),
(16,2,5,20),
(16,3,5,20),
(16,1,6,20),
(16,2,6,20),
(16,3,6,20),
(17,7,3,15),
(17,7,5,15),
(17,7,8,15),
(18,1,1,20),
(18,2,1,20),
(18,3,1,20),
(19,1,4,20),
(19,2,4,20),
(19,3,4,20),
(20,1,5,20),
(20,2,5,20),
(20,3,5,20),
(21,7,1,200),
(21,7,2,200),
(22,7,7,1),
(23,7,7,5),
(24,2,5,10),
(24,3,5,10),
(24,4,5,4),
(25,2,1,10),
(25,3,1,10),
(25,4,1,4),
(25,2,8,10),
(25,3,8,10),
(25,4,8,4),
(26,2,1,15),
(26,3,1,11),
(26,4,1,15),
(26,2,3,15),
(26,3,3,0),
(26,4,3,15),
(26,2,2,0),
(26,3,2,11),
(26,4,2,15),
(27,3,1,23);

INSERT INTO customers (first_name, last_name, email, password, adress, city, zip_code, phone_number) VALUES
('Tommy', 'McDondle', 'McDodle@mail.com', '12345', 'Draottninggatan 22', 'Helsingborg', '25231', '070-1234567'),
('Marie', 'Antoinette', 'antoinette@royaltymail.com', 'letthemeatbread', 'Kingsroad 1', 'Paris', '25231', '070-1234567'),
('Kalle', 'Anka', 'K.Anka@Quackmail.com', 'Kajsa', 'Paradisäpplevägen 111', 'Ankeborg', '25231', '070-1234567');