import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import { selectMessage } from '../redux/selectors';
import { closeMessage } from '../redux/actions';

export const Message = () => {
    const dispatch = useDispatch();
    const { type, message, snackOpen, description } = useSelector(selectMessage);

    const handleClose = () => dispatch(closeMessage());

    return (
        <Snackbar
            open={snackOpen}
            onClose={handleClose}
            autoHideDuration={4000}
            // anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%', boxShadow: 2 }}>
                {description ? (
                    <>
                        <AlertTitle>
                            <strong>{message}</strong>
                        </AlertTitle>
                        {description}
                    </>
                ) : (
                    message
                )}
            </Alert>
        </Snackbar>
    );
};
