-- Users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Entities Table (Ice Rinks, Coaches, Clubs)
CREATE TABLE entities (
    entity_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    description TEXT,
    icon_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Reviews Table
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    entity_id INT,
    rating DECIMAL(3,1) NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (entity_id) REFERENCES entities(entity_id)
);

-- Additional Information Table (for entity-specific details)
CREATE TABLE additional_info (
    info_id INT PRIMARY KEY AUTO_INCREMENT,
    entity_id INT,
    key VARCHAR(50) NOT NULL,
    value TEXT,
    FOREIGN KEY (entity_id) REFERENCES entities(entity_id)
);