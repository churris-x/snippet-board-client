import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, TextField, Paper, Grid, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';

import { clearPost, deletePost, editPost, fetchPostById } from '../redux/actions';
import { selectIsLoading, selectPostById } from '../redux/selectors';

import { Editor } from '../components';

export const SnippetsEditPage = () => {
    const navigate = useNavigate();
    const postId = useParams().id;
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);
    const post = useSelector(selectPostById);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [syntax, setSyntax] = useState('plain_text');

    const [showModal, setShowModal] = useState(false);
    const [showUndo, setShowUndo] = useState(false);

    const handleDelete = () => {
        setShowModal(false);
        dispatch(deletePost(post.id, navigate));
    };
    const handleSubmit = () =>
        dispatch(editPost({ id: post.id, title, body, description, syntax }, navigate));
    const handleUndo = () => {
        setTitle(post.title);
        setBody(post.body);
        setDescription(post.description || '');
        setSyntax(post.syntax);
        setShowUndo(false);
    };

    const handleTitle = event => setTitle(event.target.value);
    const handleBody = newValue => setBody(newValue);
    const handleDescription = event => setDescription(event.target.value);
    const handleSyntax = newValue => setSyntax(newValue);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setDescription(post.description || '');
            setSyntax(post.syntax);
        }
    }, [post]);

    useEffect(() => {
        if (
            post &&
            (title !== post.title ||
                body !== post.body ||
                description !== post.description ||
                syntax !== post.syntax)
        )
            setShowUndo(true);
    }, [title, body, description, syntax]);

    useEffect(() => {
        dispatch(fetchPostById(postId));
        return () => dispatch(clearPost());
    }, []);

    return (
        <Container sx={{ m: 'auto', p: 0, mt: 8, maxWidth: { md: 'lg' } }}>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '4px',
                        p: 3,
                    }}
                >
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Confirm delete
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Are you sure you want to delete <strong>{post && post.title}</strong> ?
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={handleDelete}
                            variant='contained'
                            disabled={isLoading}
                            sx={{
                                backgroundColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'secondary.light',
                                },
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => setShowModal(false)}
                            variant='outlined'
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Paper sx={{ m: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component='h1' variant='h4'>
                    Edit snippet
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={title}
                                onChange={handleTitle}
                                margin='normal'
                                required
                                fullWidth
                                disabled={isLoading}
                                id='title'
                                label='Title'
                                name='Title'
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={description}
                                onChange={handleDescription}
                                margin='normal'
                                fullWidth
                                multiline
                                disabled={isLoading}
                                id='description'
                                label='Description'
                                name='Description'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Editor
                                value={body}
                                onChange={handleBody}
                                initialSyntax={syntax}
                                onSyntaxChange={handleSyntax}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => setShowModal(true)}
                                variant='contained'
                                disabled={isLoading}
                                sx={{
                                    backgroundColor: 'secondary.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.light',
                                    },
                                    marginRight: 'auto',
                                }}
                            >
                                <Typography
                                    sx={{
                                        display: { xs: 'none', sm: 'inline' },
                                    }}
                                >
                                    Delete
                                </Typography>
                                <DeleteIcon
                                    sx={{
                                        display: { xs: 'inline', sm: 'none' },
                                    }}
                                    aria-label='Delete Snippet'
                                />
                            </Button>
                            <Button
                                onClick={handleUndo}
                                variant='outlined'
                                disabled={isLoading}
                                sx={{
                                    mx: 2,
                                    display: showUndo ? null : 'none',
                                }}
                            >
                                <Typography
                                    sx={{
                                        display: { xs: 'none', sm: 'inline' },
                                    }}
                                >
                                    Undo
                                </Typography>
                                <UndoIcon
                                    sx={{
                                        display: { xs: 'inline', sm: 'none' },
                                    }}
                                    aria-label='Undo changes'
                                />
                            </Button>
                            <Button onClick={handleSubmit} variant='contained' disabled={isLoading}>
                                <Typography
                                    sx={{
                                        display: { xs: 'none', sm: 'inline' },
                                    }}
                                >
                                    Update
                                </Typography>
                                <EditIcon
                                    sx={{
                                        display: { xs: 'inline', sm: 'none' },
                                    }}
                                    aria-label='Update snippet'
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};
