package com.paszkowski.pokerek.exception;

public class PlayerAlreadyExistsException extends Exception {
    public PlayerAlreadyExistsException() {
        super();
    }

    public PlayerAlreadyExistsException(String message) {
        super(message);
    }

    public PlayerAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlayerAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}