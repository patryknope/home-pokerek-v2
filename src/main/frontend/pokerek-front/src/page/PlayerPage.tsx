import { Typography} from "@mui/material";
import Button from "@material-ui/core/Button";
import {RouterHistory} from "../service/RouterHistory";
import React from "react";
import {PlayerList} from "../components/Player/PlayerList";
import {PlayerAdd} from "../components/Player/PlayerAdd";
import {PlayerDetails} from "../components/Player/PlayerDetails";
import {PlayerEdit} from "../components/Player/PlayerEdit";
import { makeStyles } from '@material-ui/styles';
import {Route, Routes} from 'react-router-dom';

const useStyles = makeStyles({
    navButtons: {
        marginBottom: 45,
    },
    navButton: {
        minWidth: "10%",
        marginLeft: 10,
        marginRight: 10,
    },
    routedComponent: {
        margin: "0 15px",
        paddingBottom: "1px",
    }
})

export function PlayerPage() {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Players
            </Typography>
            <div className={classes.navButtons}>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.navButton}
                    onClick={() => RouterHistory.history.push('/players/list')}
                >
                    List
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.navButton}
                    onClick={() => RouterHistory.history.push('/players/add')}
                >
                    Add new player
                </Button>
            </div>

            <div className={classes.routedComponent}>
                <div>
                    <Routes>
                    <Route path="/players/list" element={<PlayerList/>}/>
                        <Route path="/players/add" element={<PlayerAdd/>}/>
                        {/*<Route path="/players/:id/edit" element={<PlayerEdit/>}>*/}
                        {/*    <Route path="/players/:id" element={<PlayerDetails/>}/>*/}
                    </Routes>

                </div>
            </div>
        </>
    );
}