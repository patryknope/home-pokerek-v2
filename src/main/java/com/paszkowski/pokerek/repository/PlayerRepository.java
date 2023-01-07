package com.paszkowski.pokerek.repository;

import com.paszkowski.pokerek.model.player.Player;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends PagingAndSortingRepository<Player, Long> {
    boolean existsByEmail(String email);
}