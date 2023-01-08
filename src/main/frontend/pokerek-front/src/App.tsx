import * as React from 'react';


import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from "./page/Homepage";

import Dashboard from "./components/Dashboard";
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {PlayerPage} from "./page/PlayerPage";
import {Header} from "./components/Header";
import {Router} from "react-router-dom";
import { Fragment } from 'react';


const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#9D1681",
        },
        error: {
            main: "#00B2BB",
        },
        warning: {
            main: "#00B2BB",
        },
        info: {
            main: "#000000",
        },
        success: {
            main: "#9D1681",
        },
    },
    typography: {
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
});
const snackbarClasses = {
    icon: {
        marginRight: theme.spacing(1),
    },
    success: {
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    error: {
        backgroundColor: `${theme.palette.error.main} !important`,
    },
    info: {
        backgroundColor: `${theme.palette.info.main} !important`,
    },
    warning: {
        backgroundColor: `${theme.palette.warning.main} !important`,
    },
}

const useStyles = makeStyles({
    routedPage: {
        margin: "64px 10% 0",
        padding: "30px 0",
        width: "100%",
    },
    ...snackbarClasses,
});


function App() {
    const classes = useStyles();
  return (
                <BrowserRouter>
                    <Header/>
                  <Routes>
                      <Route path="players/*" element={<PlayerPage/>}/>
                      <Route path="dashboard" element={<Dashboard/>}/>
                      <Route path="/" element={<Homepage />}/>
                  </Routes>
                </BrowserRouter>


  )
}

export default App;