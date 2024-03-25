import { Container, Typography, Box } from '@mui/material';

export const NotFoundPage = () => {
    return (
        <Container maxWidth='lg'>
            <Box
                sx={{
                    m: 1,
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    component='h2'
                    variant='h3'
                    sx={{ /* color: 'primary.main', */ fontWeight: 'bold' }}
                >
                    404 Not found
                </Typography>
            </Box>
        </Container>
    );
};
