import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import ContentWrapper from '../components/common/ContentWrapper';
import { Typography, Box, CircularProgress, Grid, Chip, Divider } from '@mui/material';
import { useTaskData } from '../components/hooks/useTaskData';
import { TaskDevice } from '../components/task/TaskDevice';
import { TaskRefresh } from '../components/task/TaskRefresh';
import StartTrainButton from '../components/task/StartTrainButton';
import TransitionAlerts from '../components/common/TransitionAlerts';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { readTask } from '../modules/task';
import { setOriginalTask } from '../modules/create';
import NavTabs from '../components/task/NavTabs';

import ShowPlotButton from '../components/graph/ShowPlotButton';

const TaskDetailPage = () => {
  const { _id } = useParams();
  const { task } = useSelector(({ task }) => ({
    task: task.task,
  }));
  const { data, loading, requestData, socketRef, status } = useTaskData(_id);
  const dispatch = useDispatch();

  const [selectedDeviceIndices, setSelectedDeviceIndices] = useState([]);
  const [isTrainStarted, setIsTrainStarted] = useState(false);

  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  useEffect(() => {
    dispatch(readTask(_id));

    socketRef.current.on('startTrainResponse', (response) => {
      const { status } = response;
      const message =
        status === 'Task started.'
          ? 'The task has started successfully.'
          : status;
      const severity = status === 'Task started.' ? 'success' : 'error';

      setAlert({ open: true, message, severity });
    });
  }, []);

  const handleSelect = (device, index) => {
    if (selectedDeviceIndices.includes(index)) {
      setSelectedDeviceIndices(
        selectedDeviceIndices.filter((item) => item !== index),
      );
    } else {
      setSelectedDeviceIndices([...selectedDeviceIndices, index]);
    }
  };

  const handleStartTrain = (selectedDeviceIndices, socketRef) => {
    const selectedDevices = selectedDeviceIndices.map(
      (index) => data[index].Device_mac,
    );

    socketRef.current.emit(
      'startTrain',
      {
        taskId: _id,
        devices: selectedDevices,
        serverRepoAddr: task.serverRepoAddr,
      },
      (response) => {
        // Handle the response here
        const { status } = response;
        const message =
          status === 'Task started.'
            ? 'The task has started successfully.'
            : status;
        const severity = status === 'Task started.' ? 'success' : 'error';

        setAlert({ open: true, message, severity });
      },
    );

    setIsTrainStarted(true); // Set the state to indicate that training has started
  };

  const handleShowTrainResult = () => {
    // Logic to show the train result
    console.log('Show train result');
  };

  const handleEdit = () => {
    dispatch(setOriginalTask(task));
    navigate('/task/create', { state: { isEdit: true, editId: _id } });
  };



  return (
    <>
      <Header />
      <ContentWrapper>
        <Box sx={{ position: 'relative', right: 1, mr: 6, mb: 5 }}>
          <Typography gutterBottom variant="h5" component="div">
            Task Detail
          </Typography>
          <NavTabs _id = {_id} />
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box whiteSpace="nowrap">
                <Typography gutterBottom variant="h6" component="div">
                  Join FL Clients with Task ID <b>'{_id}'</b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end">
              <TaskRefresh loading={loading} onRequestData={requestData} />
            </Grid>
          </Grid>

          {task && task.serverRepoAddr && (
            <Typography
              variant="body1"
              component="p"
              sx={{ mb: 1, color: 'text.secondary' }}
            >
              FL server will clone to
              <b><br></br>'{task.serverRepoAddr}'</b> ...
            </Typography>
          )}

          {alert.open && (
            <TransitionAlerts
              alert={alert}
              setAlert={setAlert}
              sx={{ mt: 2 }}
            />
          )}

          {status && !loading && (
            <Chip label={status.status} variant="outlined" sx={{ mt: 2 }} />
          )}

          {/* <Divider sx={{ mt: 1, mb: 3 }} /> */}

          {loading ? (
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '50vh' }}
            >
              <CircularProgress />
            </Grid>
          ) : Array.isArray(data) ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {data.map((device, index) => (
                <TaskDevice
                  key={index}
                  device={device}
                  index={index}
                  isSelected={selectedDeviceIndices.includes(index)}
                  onSelect={handleSelect}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" component="p">
              No data available.
            </Typography>
          )}

          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button variant="outlined" color="primary" onClick={handleEdit} sx={{ mr: 2 }}>
              Modify
            </Button>
            <StartTrainButton
              onClick={() => handleStartTrain(selectedDeviceIndices, socketRef)}
              selectedDevices={selectedDeviceIndices}
              disabled={selectedDeviceIndices.length === 0}
            />
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default TaskDetailPage;
