import {useSnackbar} from "notistack";
import {CreatePlayerRequest} from "../../data/Player";
import {PlayerService} from "../../service/PlayerService";
import {ApiError} from "../../service/api/ApiError";
import {Typography} from "@mui/material";
import {RouterHistory} from "../../service/RouterHistory";
import {PlayerForm} from "./PlayerForm";


export function PlayerAdd() {
    const {enqueueSnackbar} = useSnackbar();

    function savePlayer(newPlayer: CreatePlayerRequest) {
        PlayerService.addPlayer(newPlayer)
            .then((player) => {
                enqueueSnackbar("Saved");
                RouterHistory.history.push(`/players/${player.id}`);
            })
            .catch((err: ApiError) => enqueueSnackbar(err.message));
    }

    return (
        <>
            <Typography variant="h4" gutterBottom={true}>
                Create new player
            </Typography>
            <PlayerForm onAdd={savePlayer}/>
        </>
    );
}