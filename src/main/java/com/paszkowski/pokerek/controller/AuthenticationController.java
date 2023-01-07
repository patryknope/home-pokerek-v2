package com.paszkowski.pokerek.controller;


import com.paszkowski.pokerek.model.user.dto.AuthCredentialsRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
public class AuthenticationController {

    @PostMapping("login")
    public ResponseEntity<?> login(AuthCredentialsRequest authCredentialsRequest) {
        return ResponseEntity.ok(null);
    }
}
