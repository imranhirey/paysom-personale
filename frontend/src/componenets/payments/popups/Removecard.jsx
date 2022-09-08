import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Removecard({removewarning,setremovewarning,removepaymentmethod,idtoremove}) {

 

  const handleClose = () => {
    setremovewarning(false);
  };

  return (
    <div>
      
      <Dialog
        open={removewarning}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to remove this card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you remove this card from your account you will
            not able to add it for 2 weeks
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            removepaymentmethod(idtoremove)
          }} autoFocus>
            Remove anyway
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
