import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notifications({message,not_open,setnot_open}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setnot_open(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setnot_open(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
     
      <Snackbar open={not_open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
       {message}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}
