import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

const AlertSnackbar = ({ show, message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (show) {
      setOpen(true);
    }
  }, [show]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;
