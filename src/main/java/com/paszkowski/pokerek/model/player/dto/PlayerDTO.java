package com.paszkowski.pokerek.model.player.dto;

import com.paszkowski.pokerek.model.player.Player;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String telephoneNumber;

}