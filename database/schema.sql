-- Este script es solo de referencia / respaldo manual.
-- Con spring.jpa.hibernate.ddl-auto=update, Hibernate crea la tabla
-- automaticamente la primera vez que corres el backend.

CREATE DATABASE IF NOT EXISTS biblioteca_db;
USE biblioteca_db;

CREATE TABLE IF NOT EXISTS libro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) UNIQUE,
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_prestamo DATE
);

-- Datos de ejemplo para probar la API apenas levantes el backend
INSERT INTO libro (titulo, autor, isbn, disponible) VALUES
    ('Cien años de soledad', 'Gabriel Garcia Marquez', '978-0307474728', TRUE),
    ('Clean Code', 'Robert C. Martin', '978-0132350884', TRUE),
    ('Effective Java', 'Joshua Bloch', '978-0134685991', TRUE);
