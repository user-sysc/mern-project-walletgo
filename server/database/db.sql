CREATE DATABASE walletgo_db;

use walletgo_DB;

CREATE TABLE users(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(100)
);

--CREATE TABLE INGRESOS
CREATE TABLE incomes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300) NULL,
    createdAT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
--CREATE TABLE EGRESOS
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    amount INTEGER,
    description VARCHAR(300) NULL,
    createdAT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
--CREATE TABLE CATEGORIAS
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_category VARCHAR(200) NOT NULL,
    createdAT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE incomes
-- ADD COLUMN category_id INTEGER,
-- ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- ALTER TABLE expenses
-- ADD COLUMN category_id INTEGER,
-- ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

