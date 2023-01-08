import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type AlertDialogProps = {
    open: boolean;
    dialogTitle: string;
    dialogContent: string;
    firstButtonText: string;
    secondButtonText: string;
    firstButtonClick: () => void;
    secondButtonClick: () => void;
    onClose: () => void;
};

const AlertDialog = ({
                         open,
                         dialogTitle,
                         dialogContent,
                         firstButtonText,
                         secondButtonText,
                         firstButtonClick,
                         secondButtonClick,
                         onClose,
                     }: AlertDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={firstButtonClick} color="primary">
                    {firstButtonText}
                </Button>
                <Button onClick={secondButtonClick} color="primary" autoFocus>
                    {secondButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;