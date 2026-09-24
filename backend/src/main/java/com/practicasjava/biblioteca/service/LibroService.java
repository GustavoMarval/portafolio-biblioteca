package com.practicasjava.biblioteca.service;

import com.practicasjava.biblioteca.model.Libro;
import com.practicasjava.biblioteca.repository.LibroRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    public Libro buscarPorId(Long id) {
        return libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));
    }

    public Libro crear(Libro libro) {
        libro.setId(null);
        libro.setDisponible(true);
        libro.setFechaPrestamo(null);
        return libroRepository.save(libro);
    }

    public Libro actualizar(Long id, Libro datos) {
        var libro = buscarPorId(id);
        libro.setTitulo(datos.getTitulo());
        libro.setAutor(datos.getAutor());
        libro.setIsbn(datos.getIsbn());
        return libroRepository.save(libro);
    }

    public void eliminar(Long id) {
        var libro = buscarPorId(id);
        libroRepository.delete(libro);
    }

    public Libro prestar(Long id) {
        var libro = buscarPorId(id);
        if (!libro.isDisponible()) {
            throw new IllegalStateException("El libro '" + libro.getTitulo() + "' ya esta prestado");
        }
        libro.setDisponible(false);
        libro.setFechaPrestamo(LocalDate.now());
        return libroRepository.save(libro);
    }

    public Libro devolver(Long id) {
        var libro = buscarPorId(id);
        if (libro.isDisponible()) {
            throw new IllegalStateException("El libro '" + libro.getTitulo() + "' no estaba prestado");
        }
        libro.setDisponible(true);
        libro.setFechaPrestamo(null);
        return libroRepository.save(libro);
    }
}
