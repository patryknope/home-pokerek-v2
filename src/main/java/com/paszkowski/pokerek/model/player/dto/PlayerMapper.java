package com.paszkowski.pokerek.model.player.dto;

import com.paszkowski.pokerek.model.player.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {
    public PlayerDTO toDTO(Player player) {
        PlayerDTO dto = new PlayerDTO();
        dto.setId(player.getId());
        dto.setFirstName(player.getFirstName());
        dto.setLastName(player.getLastName());
        dto.setEmail(player.getEmail());
        dto.setTelephoneNumber(player.getTelephoneNumber());
        return dto;
    }

    public Player fromDTO(PlayerDTO dto) {
        Player player = new Player();
        player.setId(dto.getId());
        player.setFirstName(dto.getFirstName());
        player.setLastName(dto.getLastName());
        player.setEmail(dto.getEmail());
        player.setTelephoneNumber(dto.getTelephoneNumber());
        return player;
    }
}
