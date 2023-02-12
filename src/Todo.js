import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, FormControl, Select, MenuItem } from '@material-ui/core';
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Todo = ({ todo, onUpdate }) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm();
  const [status, setStatus] = useState(todo.status);
    // useEffect(()=>{
        setValue('title', todo.title);
        setValue('description', todo.description);
    // },[todo])

  
  const onSubmit = (data) => {
    onUpdate({
      ...todo,
      ...data,
      status
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.root}>
        <TextField
          label="Title"
          name="title"
          inputRef={register}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          inputRef={register}
          fullWidth
        />
        <FormControl className={classes.formControl}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="wip">WIP</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <button type="submit">Update</button>
      </Paper>
    </form>
  );
}

export default Todo;
