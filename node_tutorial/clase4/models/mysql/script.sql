CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(255) NOT NULL,
	year INT NOT NULL,
	director VARCHAR(255) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movie(id),
	genre_id INT REFERENCES genre(id),
	PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES
('Action'),
('Adventure'),
('Crime'),
('Drama'),
('Romance'),
('Sci-Fi');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'Inception', 2010, 'Christopher Nola', 180, 'https://m.media-amazon.com/images/I/714b1KQmskL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://m.media-amazon.com/images/I/71oUnx5WA4L._AC_UF894,1000_QL80_.jpg', 9.3),
(UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nola', 152, 'https://m.media-amazon.com/images/I/81IfoBox2TL.jpg', 9.0);

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
	((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
	((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action'));
	