package com.practicasjava.biblioteca.repository;

import com.practicasjava.biblioteca.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {
    // Spring Data JPA genera automaticamente el CRUD basico:
    // save, findById, findAll, deleteById, etc.
}
