import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LoginWithGoogle from '../LoginWithGoogle';
import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import Register from '../Register';
import Login from '../Login';

const useStyles = makeStyles(() => ({
  closebtn: {
    position: "absolute",
    top: "10px",
    right: "10px"
  },
  switchText: {
    textAlign: "center",
    padding: "20px 0 10px",
    fontFamily: "Poppins",
    color: "#4e63d8"
  },
  text: {
    display: "inline-block",
    cursor: "pointer",
  }
}))

const MODE = {
  login: "login",
  signup: "signup"
}
export default function FormDialog({ open, onReceiveCloseState }) {

  const classes = useStyles();
  const [mode, setMode] = useState(MODE.login);
  const handleClose = () => {
    onReceiveCloseState()
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
          {mode === MODE.signup &&
            <>
              <Register />
              <Box className={classes.switchText} >
                <Typography className={classes.text} onClick={() => setMode(MODE.login)}>
                  Already have an account ? Login here
                </Typography>
              </Box>
            </>
          }
          {mode === MODE.login &&
            <>
              <Login />
              <Box className={classes.switchText}>
                <Typography className={classes.text} onClick={() => setMode(MODE.signup)}>
                  Don't have an account ? Signup here
                </Typography>
              </Box>
            </>
          }
          <LoginWithGoogle />
        </DialogContent>
        <DialogActions>
          <IconButton className={classes.closebtn} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div >
  );
}