import { Grid, Paper, TextField, Typography, makeStyles, Checkbox } from "@material-ui/core";
import { useState } from "react";
import { Edit as EditIcon, Delete as DeleteIcon, Star, StarBorder, Check, Close } from '@material-ui/icons'

export function Input({
    no,
    id,
    value = '',
    onTextChange = () => { },
    onSave = () => { },
    onDelete = () => { },
    checked = false,
    onCheck = () => { },
    favorite = false,
    onFavorite = () => { }
}) {

    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const [tempValue, setTempValue] = useState(value)

    return (
        <Paper className={classes.container} elevation={3}>
            <Grid
                container
                alignItems='center'
                justify='center'
            >
                <Grid item xs={1} className={classes.content}>
                    <Typography>
                        {no}
                    </Typography>
                </Grid>
                <Grid item xs={1} className={classes.content}>
                    <span>
                        <Checkbox
                            color='secondary'
                            icon={<StarBorder />}
                            checkedIcon={<Star />}
                            checked={favorite}
                            onChange={onFavorite}
                        />
                    </span>
                </Grid>
                <Grid item xs={7} >
                    {
                        isEditing ? (
                            <TextField
                                fullWidth
                                variant='filled'
                                onChange={e => setTempValue(e.target.value)}
                                value={tempValue}
                            />
                        ) : (
                            <Typography>
                                {tempValue}
                            </Typography>
                        )
                    }
                </Grid>
                <Grid item xs={1} className={classes.content}>
                    <span>
                        <Checkbox
                            color='primary'
                            checked={checked}
                            onChange={onCheck}
                        />
                    </span>
                </Grid>
                <Grid item xs={1} className={classes.content}>
                    {
                        !isEditing ? (
                            <span onClick={() => setIsEditing(true)} className={classes.iconBtn}>
                                <EditIcon />
                            </span>
                        ) : (
                            <>
                                <span onClick={() => {
                                    onSave(id, tempValue)
                                    setIsEditing(false)
                                }
                                } className={classes.iconBtn}>
                                    <Check color='primary' />
                                </span>
                                <span onClick={() => {
                                    setTempValue(value)
                                    setIsEditing(false)
                                }} className={classes.iconBtn}>
                                    <Close color='secondary' />
                                </span>
                            </>
                        )
                    }
                </Grid>
                <Grid item xs={1} className={classes.content}>
                    <span onClick={() => onDelete()} className={classes.iconBtn}>
                        <DeleteIcon color='error' />
                    </span>
                </Grid>
            </Grid>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: 10
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBtn: {
        '&:hover': {
            cursor: 'pointer'
        },

    }
}))