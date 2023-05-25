import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import Header from '../components/common/Header';
import ContentWrapper from '../components/common/ContentWrapper';
import {
  createTask,
  changeField,
  initialize,
  setOriginalTask,
  updateTask,
} from '../modules/create';

const CreatePage = ({ error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const editId = state?.editId;
  const isEdit = state?.isEdit ?? false;


  const {
    title,
    description,
    tags,
    serverRepoAddr,
    task: originalTask,
  } = useSelector(({ create, tasks }) => ({
    title: create.title,
    description: create.description,
    tags: create.tags,
    serverRepoAddr: create.serverRepoAddr,
    task: tasks.task, // this task is fetched by getTask action
  }));

  const [tagInput, setTagInput] = useState('');

  // This effect handles initializing the form when the component mounts
  useEffect(() => {
    if (!isEdit) {
      dispatch(initialize());
    }
  }, [dispatch, isEdit]);

  // This effect handles setting the original task when in edit mode
  useEffect(() => {
    if (isEdit && originalTask) {
      dispatch(setOriginalTask(originalTask));
    }
  }, [dispatch, isEdit, originalTask]);

  useEffect(() => {
    setTagInput(tags ? tags.join(', ') : '');
  }, [tags]);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const processedTags = tagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    if (isEdit) {
      dispatch(
        updateTask({
          id: editId,
          title,
          description,
          tags: processedTags,
          serverRepoAddr,
        }),
      );
    } else {
      dispatch(
        createTask({
          title,
          description,
          tags: processedTags,
          serverRepoAddr,
        }),
      );
    }
  };

  const task = useSelector(({ create }) => create.task);
  const taskError = useSelector(({ create }) => create.taskError);

  useEffect(() => {
    if (task) {
      const { _id } = task;
      navigate(`/task/${_id}`);
    }
    if (taskError) {
      console.log(taskError);
    }
  }, [navigate, task, taskError]);

  useEffect(() => {
    // This function runs when the component unmounts
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

return (
  <div>
    <Header />
    <ContentWrapper>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="h5" component="div">
            {isEdit ? 'Edit Task' : 'Create Task'}
          </Typography>
        </Grid>
        {/* Only render the form if not in edit mode or if the original task's
        data has been fetched */}
        {!isEdit || editId ? (
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Grid item xs={12}>
              {error && <Typography color="error">{error}</Typography>}
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={title}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              name="description"
              label="Description"
              id="description"
              minRows="10"
              value={description}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="tags"
              label="Tags"
              name="tags"
              value={tagInput} // Convert the array of tags to a comma-separated string
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="serverRepoAddr"
              label="Server Git Repository Address"
              name="serverRepoAddr"
              type="url"
              placeholder="https://github.com/gachon-CCLab/FedOps-Training-Server.git"
              value={serverRepoAddr}
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isEdit ? 'Edit' : 'Create'}
            </Button>
          </Box>
        ) : null}
      </Box>
    </ContentWrapper>
  </div>
);};

export default CreatePage;
