import {makeStyles} from "@material-ui/styles";
import {NavLink} from "react-router-dom";
import React from "react";

const headerButtonStyles = {
    padding: "10px",
    margin: "0 10px",
    color: "black",
    textDecoration: "none",
    textTransform: "uppercase" as const,
    display: "inline-block",
};

const activeHeaderButtonStyles = {
    borderRadius: "5px",
    border: "solid 1px white",
};

const useStyles = makeStyles((theme) => ({
    appBar: {
        width: "100%",
        backgroundColor: "gray",
        height: "75px"
    },
    logo: {
        height: "64px",
    },
    toolBar: {
        justifyContent: "space-between"
    },
    headerButton: {
        ...headerButtonStyles
    },
    userName: {
        margin: "0 10px",
    },
    rightSideToolbar: {
        display: "flex",
        alignItems: "center",
    },
    menuIcon: {
        minWidth: "30px",
    },
    menuItemNavLink: {
        textDecoration: "none",
        color: "black",
    },
    menuItem: {
        textDecoration: "none",
    },
}));


export function Header() {
    const classes = useStyles();
        return (
            <>
                <div className={classes.appBar}>
                <NavLink to="players/list"
                         className={classes.headerButton}
                         >
                    Players
                </NavLink>
                <NavLink to="/dashboard"
                         className={classes.headerButton}
                >
                    Dashboard
                </NavLink>
                </div>
            </>
        )
}