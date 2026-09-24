package com.practicasjava.biblioteca.service;

public class LibroNoEncontradoException extends RuntimeException {

    public LibroNoEncontradoException(Long id) {
        super("No se encontro un libro con id " + id);
    }
}
