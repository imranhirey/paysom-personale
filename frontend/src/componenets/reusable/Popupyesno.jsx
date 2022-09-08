import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Button from '@mui/material/Button';

export default function Popupyesno() {
const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Two-Factor Authentication is turned off your account!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            to ensure the security of your account please turn on Two-Factor Authentication in your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error'  onClick={handleClose}>
            cancel
          </Button>
          <Button color='warning'  onClick={handleClose}>
          dont't ask me again
          </Button>
          
          <Button color='success' onClick={handleClose} >
            turn on
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
