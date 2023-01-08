import {Button, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Player} from "../../data/Player";
import {PlayerService} from '../../service/PlayerService'
import {ApiError} from "../../service/api/ApiError";
import AlertDialog from "../../utils/AlertDialog";
import {RouterHistory} from "../../service/RouterHistory";
import {TableColumn} from "../../data/TableColumn";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    formElement: {
        marginBottom: "30px",
    },
    buttonColumn: {
        textAlign: "right",
        minWidth: "0px",
    },
    listElementButton: {
        marginLeft: 5,
        marginRight: 5,
    },
});
export function PlayerList() {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const [playersPage, setPlayersPage] = useState<Player[] | undefined>(undefined);
    const [playerToDelete, setPlayerToDelete] = useState<Player | undefined>(undefined);

    useEffect(() => {
        onViewChange();
    },[])

    const onViewChange = () => {
        PlayerService.getPlayers()
            .then(setPlayersPage)
            .catch((err: ApiError) => {
                enqueueSnackbar(err.message);
            });
    };
    const deletePlayer = (playerId: string) => {
        PlayerService.deletePlayerById(playerId)
            .then(() => {
                onViewChange();
                enqueueSnackbar("Player deleted");
            })
            .catch((err: ApiError) => {
                enqueueSnackbar(err.message);
            });
    };

    const renderButtonColumn = (player: Player) => {
        return (
            <>
            <div className={classes.buttonColumn}>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.listElementButton}
                    onClick={() => RouterHistory.history.push("/player/" + player.id)}
                >
                    Details
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.listElementButton}
                    onClick={() => RouterHistory.history.push("/player/" + player.id + "/edit")}
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    variant="outlined"
                    className={classes.listElementButton}
                    onClick={() => setPlayerToDelete(player)}
                >
                    Delete
                </Button>
            </div>
            </>
        );
    };
    const columns = [
        new TableColumn(
            "First name",
            (player: Player) => player.firstName,
            "firstName"
        ),
        new TableColumn(
            "Last name",
            (player: Player) => player.lastName,
            "lastName"
        ),
        new TableColumn(
            "Email",
            (player: Player) => player.email,
            "email"
        ),
        new TableColumn(
            "Telephone",
            (player: Player) => player.telephoneNumber,
            "telephoneNumber"
        ),
        new TableColumn<Player>("", renderButtonColumn),
    ];
    return (
        <>
            <div className={classes.formElement}>
                <Typography variant="h4" gutterBottom={true}>
                    List of players
                </Typography>
                {playersPage && (
                    <div>There will be soon a list of players</div>
                )}
            </div>
            {playerToDelete && (
                <AlertDialog
                    open={true}
                    dialogTitle={"u sure?"}
                    dialogContent={`Player ${playerToDelete.fullName} will be deleted`}
                    firstButtonText="Delete"
                    secondButtonText="Close"
                    firstButtonClick={() => {
                        deletePlayer(playerToDelete.id);
                        setPlayerToDelete(undefined);
                    }}
                    secondButtonClick={() => setPlayerToDelete(undefined)}
                    onClose={() => setPlayerToDelete(undefined)}
                />
            )}
        </>
    );
}