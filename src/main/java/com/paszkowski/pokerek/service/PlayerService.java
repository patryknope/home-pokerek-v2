package com.paszkowski.pokerek.service;

import com.paszkowski.pokerek.exception.PlayerAlreadyExistsException;
import com.paszkowski.pokerek.exception.PlayerNotFoundException;
import com.paszkowski.pokerek.model.player.Player;
import com.paszkowski.pokerek.model.player.dto.PlayerDTO;
import com.paszkowski.pokerek.model.player.dto.PlayerMapper;
import com.paszkowski.pokerek.repository.PlayerRepository;
import com.paszkowski.pokerek.utils.PlayerPage;
import lombok.SneakyThrows;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;

    public PlayerService(PlayerRepository playerRepository, PlayerMapper playerMapper) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
    }

    public Page<PlayerDTO> getPlayers(PlayerPage playerPage) {
        Sort sort = Sort.by(playerPage.getSortDirection(), playerPage.getSortBy());
        Pageable pageable = PageRequest.of(playerPage.getPageNumber(),
                playerPage.getPageSize(), sort);
        Page<Player> playersPage = playerRepository.findAll(pageable);
        List<PlayerDTO> playerDTOList = playersPage.getContent().stream()
                .map(playerMapper::toDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(playerDTOList, pageable, playersPage.getTotalElements());
    }
    @SneakyThrows
    public PlayerDTO getPlayer(Long id) {
        Player player = playerRepository.findById(id).orElseThrow(PlayerNotFoundException::new);
        return playerMapper.toDTO(player);
    }
    @SneakyThrows
    public PlayerDTO addPlayer(PlayerDTO playerDTO) {
        Player player = playerMapper.fromDTO(playerDTO);
        if (playerRepository.existsByEmail(player.getEmail())) {
            throw new PlayerAlreadyExistsException("A player with the same email address already exists.");
        }
        Player savedPlayer = playerRepository.save(player);
        return playerMapper.toDTO(savedPlayer);
    }
    @SneakyThrows
    public PlayerDTO updatePlayer(Long id, PlayerDTO playerDTO) {
        Player player = playerRepository.findById(id).orElseThrow(PlayerNotFoundException::new);
        player.setFirstName(playerDTO.getFirstName());
        player.setLastName(playerDTO.getLastName());
        player.setEmail(playerDTO.getEmail());
        player.setTelephoneNumber(playerDTO.getTelephoneNumber());
        Player updatedPlayer = playerRepository.save(player);
        return playerMapper.toDTO(updatedPlayer);
    }
    @SneakyThrows
    public void deletePlayer(Long id) {
        if (playerRepository.findById(id).isPresent()) {
            playerRepository.deleteById(id);
        } else {
            throw new PlayerNotFoundException();
        }
    }
}
