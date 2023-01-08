import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Player, UpdatePlayerRequest} from "../../data/Player";
import {PlayerService} from "../../service/PlayerService";
import {ApiError} from "../../service/api/ApiError";
import {Typography} from "@mui/material";
import {RouterHistory} from "../../service/RouterHistory";
import {PlayerForm} from "./PlayerForm";


interface Props {
    id: string;
}
export function PlayerEdit(props: Props) {
    const {enqueueSnackbar} = useSnackbar();

    const [player, setPlayer] = useState<Player | undefined>(undefined);


    useEffect(loadPlayer, [props.id]);
    function loadPlayer() {
        PlayerService.getPlayerById(props.id)
            .then(setPlayer)
            .catch((err: ApiError) => {
                enqueueSnackbar(err.message);
                RouterHistory.history.push("/players/list");
                setPlayer(undefined);
            });
    }
    function savePlayer(newPlayer: UpdatePlayerRequest) {
        PlayerService.updatePlayer(newPlayer)
            .then((player) => {
                enqueueSnackbar('Saved');
                RouterHistory.history.push(`/player/${player.id}`);
            })
            .catch((err: ApiError) => {
                enqueueSnackbar(err.message);
            });
    }
    if (player == undefined) {
        return null;
    } else {
        return (
            <>
                <Typography variant="h4" gutterBottom={true}>
                    Edit player data
                </Typography>
                <PlayerForm player={player} onEdit={savePlayer} />
            </>
        )
    }
}