import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    CreatePlayerRequest,
    Player,
    PlayerBase,
    UpdatePlayerRequest,
} from "../../data/Player";
import { TextField } from "@mui/material";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        marginBottom: "30px",
    },
    formElement: {
        marginBottom: "30px",
    },
    longInput: {
        width: "100%",
    },
    saveButton: {
        paddingLeft: "30px",
        paddingRight: "30px",
    },
    shortInput: {
        width: "15vw",
    },
});

interface PlayerFormProps {
    onAdd?: (newPlayer: CreatePlayerRequest) => void;
    onEdit?: (newPlayer: UpdatePlayerRequest) => void;
    player?: Player;
}

const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    telephoneNumber: yup.string(),
    gamesWon: yup.number()
});

export function PlayerForm(props: PlayerFormProps) {
    const { player, onEdit, onAdd } = props;
    const classes = useStyles();

    useEffect(() => {
        if (onEdit !== undefined && onAdd !== undefined) {
            console.error("not valid properties");
        }
    }, [onEdit, onAdd]);

    const {
        handleSubmit,
        formState: { errors, isValid },
        control,
    } = useForm<PlayerBase>({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            telephoneNumber: "",
            gamesWon:  1
        },
    });

    function submitForm(data: PlayerBase) {
        if (player !== undefined && onEdit !== undefined) {
            onEdit({
                id: player.id,
                ...data,
            });
        } else if (onAdd !== undefined) {
            onAdd(data);
        }
    }
    if (player === undefined) {
        if (onAdd === undefined) {
            console.error("no onadd function");
            return null;
        }
    } else {
        if (onEdit === undefined) {
            console.error("no onedit function");
            return null;
        }
    }
    return (
        <>
            <div className={classes.root}>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className={classes.formElement}>
                        <Controller render={(props) => (
                            <TextField
                                {...props}
                                label={"Email"}
                                error={errors.email !== undefined}
                                className={classes.longInput}
                            />
                        )}
                                    name="email"
                                    control={control}
                        />
                    </div>
                    <div className={classes.formElement}>
                        <Controller
                            render={(props) => (
                                <TextField
                                    {...props}
                                    label={"First name"}
                                    error={errors.firstName !== undefined}
                                    className={classes.longInput}
                                />
                            )}
                            name="firstName"
                            control={control}
                        />
                    </div>
                    <div className={classes.formElement}>
                        <Controller
                            render={(props) => (
                                <TextField
                                    {...props}
                                    label={"Last name"}
                                    error={errors.lastName !== undefined}
                                    className={classes.longInput}
                                />
                            )}
                            name="lastName"
                            control={control}
                        />
                    </div>
                    <div className={classes.formElement}>
                        <Controller
                            render={(props) => (
                                <TextField
                                    {...props}
                                    label={"Telephone"}
                                    error={errors.telephoneNumber !== undefined}
                                    className={classes.longInput}
                                />
                            )}
                            name="telephoneNumber"
                            control={control}
                        />
                    </div>
                    <div className={classes.formElement}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isValid}
                            className={classes.saveButton}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}