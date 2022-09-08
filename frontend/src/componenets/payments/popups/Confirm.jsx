import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmSomething({confirmopen,setconfirmopen,title,handleaction,subtitle}) {
  const [open, setOpen] = React.useState(false);

 

  const handleClose = () => {
    setconfirmopen(false)
  };

  return (
    <div>
      
      <Dialog
        open={confirmopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleaction}>Yes Sure</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
