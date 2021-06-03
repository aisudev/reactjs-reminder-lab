import React, { useContext } from 'react'
import MainController, { mainContext } from './controller'
import withController from '../../hoc/withController'
import { Container, makeStyles, Typography, Paper, Grid, TextField, Button } from '@material-ui/core'
import { Input } from './component'
const MainScreen = () => {

    const classes = useStyles()
    const {
        todo,
        input, setInput,
        createHandle, checkHandle, favoriteHandle, deleteHandle, updateHandle, summary
    } = useContext(mainContext)

    return (
        <>
            <Container
                maxWidth='md'
                className={classes.container}
            >
                {/* Header */}
                <Paper
                    className={classes.header}
                >
                    <Typography className={classes.headerContent}>
                        Reminder-Lab
                    </Typography>
                </Paper>
                {/* Todo */}
                <Grid
                    container
                >
                    {/* Input */}
                    <Grid item xs={12}> 
                        <Typography>
                            Progress: {summary.progress}/{summary.total}
                        </Typography>
                        <Typography>
                            Favorite: {summary.favorite}/{summary.total}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        item xs={12}
                    >
                        <Grid item xs={10}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ height: '100%' }}
                                fullWidth
                                onClick={() => createHandle()}
                            >SAVE</Button>
                        </Grid>
                    </Grid>
                    {/* List */}
                    {
                        todo.map((item, ind) => (
                            <Grid
                                item xs={12}
                            >
                                <Input
                                    no={ind + 1}
                                    id={item.id}
                                    value={item.value}
                                    checked={item.checked}
                                    onCheck={() => checkHandle(item.id)}
                                    favorite={item.favorite}
                                    onFavorite={() => favoriteHandle(item.id)}
                                    onDelete={() => deleteHandle(item.id)}
                                    onSave={updateHandle}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                {/* summary */}
            </Container>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        height: '100vh',
        padding: '10em 2em'
    },
    wraper: {

    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1em 3em',
        marginBottom: theme.spacing(5)
    },
    headerContent: {
        fontWeight: 500,
        fontSize: 32
    }
}))

export default withController(MainController)(MainScreen)