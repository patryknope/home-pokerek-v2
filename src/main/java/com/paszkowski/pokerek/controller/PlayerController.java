package com.paszkowski.pokerek.controller;


import com.paszkowski.pokerek.model.player.Player;
import com.paszkowski.pokerek.model.player.dto.PlayerDTO;
import com.paszkowski.pokerek.service.PlayerService;
import com.paszkowski.pokerek.utils.PlayerPage;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/players/")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }
    @GetMapping
    public Page<PlayerDTO> getAllPlayers(PlayerPage playerPage) {
        return playerService.getPlayers(playerPage);
    }
    @GetMapping("{id}")
    public PlayerDTO getPlayer(@PathVariable Long id) {
        return playerService.getPlayer(id);
    }

    @PostMapping
    public PlayerDTO addPlayer(@Valid @RequestBody PlayerDTO playerDTO) {
        return playerService.addPlayer(playerDTO);
    }

    @DeleteMapping("{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
    }
}
