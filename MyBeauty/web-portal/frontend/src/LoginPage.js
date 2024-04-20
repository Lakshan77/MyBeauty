import React from 'react';
import { Button, Typography, Box, Paper, Container } from '@mui/material';
// import backgroundImage from './BC_Image.jpg';

const LoginPage = () => {
    return (
        // <Box
        //     sx={{
        //         minHeight: '100vh',
        //         // backgroundImage: `url(${backgroundImage})`,
        //         backgroundRepeat: 'no-repeat',
        //         backgroundSize: 'cover',
        //         backgroundPosition: 'center',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //     }}
        // >
        <Container maxWidth="XS">
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                    Welcome to MyBeauty
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
                    For Your Beauty Forever
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.href = "/auth/login"}
                >
                    Login
                </Button>
            </Paper>
        </Container>
        // </Box>

    );
};

export default LoginPage;