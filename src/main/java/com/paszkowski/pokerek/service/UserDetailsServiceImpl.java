package com.paszkowski.pokerek.service;

import com.paszkowski.pokerek.model.user.User;
import com.paszkowski.pokerek.repository.UserRepository;
import com.paszkowski.pokerek.security.PasswordEncoderConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoderConfig passwordEncoderConfig;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        return user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
