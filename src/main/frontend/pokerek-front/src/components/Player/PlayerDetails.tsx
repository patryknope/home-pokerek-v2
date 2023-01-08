import {useSnackbar} from "notistack";
import {Player} from "../../data/Player";
import {useEffect, useState} from "react";
import {PlayerService} from "../../service/PlayerService";
import {ApiError} from "../../service/api/ApiError";
import {Button, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {RouterHistory} from "../../service/RouterHistory";
import AlertDialog from "../../utils/AlertDialog";
import {makeStyles} from "@material-ui/styles";

interface Props {
    id: string;
}
const useStyles = makeStyles({
    detailsElement: {
        marginTop: "30px",
        marginBottom: "30px",
    },
    optionButton: {
        minWidth: "10%",
        marginLeft: 10,
        marginRight: 10,
        "&:first-child": {
            marginLeft: 0,
        },
        "&:last-child": {
            marginRight: 0,
        },
    },
    textWithWhiteSpaces: {
        whiteSpace: "pre-wrap",
    },
});
export function PlayerDetails(props: Props) {
    const classes = useStyles();

    const {enqueueSnackbar} = useSnackbar();

    const [player, setPlayer] = useState<Player | undefined>(undefined);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    function deletePlayer() {
        if (player) {
            PlayerService.deletePlayerById(player.id)
                .then(() => {
                    enqueueSnackbar("Player deleted");
                    RouterHistory.history.push("/players/list");
                })
                .catch((err: ApiError) => enqueueSnackbar(err.message))
                .finally(() => setShowDeleteDialog(false));
        } else {
            console.warn("no player to delete lol");
        }
    }
    if (!player) {
        return <p>there is no player</p>
    }
    return (
        <>
            <div className={classes.detailsElement}>
                <Typography variant="h4" gutterBottom={true}>
                    Player details
                </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>{player.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Last name</TableCell>
                            <TableCell>{player.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{player.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Telephone</TableCell>
                            <TableCell>{player.telephoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Games won</TableCell>
                            <TableCell>{player.gamesWon}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div className={classes.detailsElement}>
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.optionButton}
                    onClick={() =>
                        RouterHistory.history.push(
                            "/player/" + player.id + "/edit"
                        )
                    }
                >
                    Edit
                </Button>
                <Button
                    color="secondary"
                    variant="outlined"
                    className={classes.optionButton}
                    onClick={() =>
                        setShowDeleteDialog(true)}
                >
                    Delete
                </Button>
            </div>

            {showDeleteDialog && (
                <AlertDialog
                    open={showDeleteDialog}
                    dialogTitle={"u sure?"}
                    dialogContent={`Player ${player.fullName} will be deleted`}
                    firstButtonText="Delete"
                    secondButtonText="Close"
                    firstButtonClick={deletePlayer}
                    secondButtonClick={() => setShowDeleteDialog(false)}
                    onClose={() => setShowDeleteDialog(false)}
                />
            )}
        </>
    )
}