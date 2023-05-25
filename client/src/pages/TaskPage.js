import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Fab,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/common/Header';
import ContentWrapper from '../components/common/ContentWrapper';
import { listTasks } from '../modules/tasks';

const TaskItem = ({ task }) => {
  const { publishedDate, user, tags, title, description, _id } = task;

  const timeDifference = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  };

  return (
    <Grid item xs={12} sm={6} sx={{ marginBottom: 2 }}>
      <Card sx={{ margin: 1 }}>
        <Link to={`/task/${_id}`} style={{textDecoration: 'none'}}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
              >
                {title}
              </Typography>
              {/* <Typography gutterBottom variant="h5" component="div">
                {user.username}
              </Typography> */}
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ color: 'text.disabled' }}
              >
                {timeDifference(new Date(), new Date(publishedDate))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="div"
                sx={{ color: 'secondary.main' }}
              >
                {tags.join(', ')}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
    // <div>
    //   <h2>
    //     <Link to={`/@${user.username}/${_id}`}>{title}</Link>
    //   </h2>
    //   <SubInfo
    //     username={user.username}
    //     publishedDate={new Date(publishedDate)}
    //   />
    //   <p>{tags}</p>>
    //   <p>{body}</p>
    // </div>
  );
};

const TaskPage = ({ match }) => {
  const location = useLocation();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [tasksLoaded, setTasksLoaded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { tasks, error, loading, user } = useSelector(
    ({ tasks, loading, user }) => ({
      tasks: tasks.tasks,
      error: tasks.error,
      loading: loading['tasks/LIST_TASKS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const fetchData = async () => {
      const { tag, page } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      if (user || initialLoad) {
        try {
          await dispatch(listTasks({ tag, username, page }));
          setTasksLoaded(true);
        } catch {
          setTasksLoaded(true);
        }
        setInitialLoad(false);
      }
    };
    fetchData();
  }, [dispatch, location.search, username, user, initialLoad]);



  // 에러 발생 시
  if (error && !user) {
    return (
      <>
        <Header />
        <ContentWrapper>
          <Typography>
            <Link to="/login">Sign in</Link> to see your tasks.
          </Typography>
        </ContentWrapper>
      </>
    );
  }

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom variant="h5" component="div">
              Task
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ position: 'absolute', right: 1, mr: 6, mb: 5 }}>
              {user && (
                <Link to="/task/create">
                  <Fab color="secondary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Link>
              )}
            </Box>
          </Grid>
          <br />

          {/* 로딩 중이 아니고, Task 배열이 존재할 때만 보여 줌 */}
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
          ) : tasks && tasks.length > 0 && (!initialLoad || user) ? (
            tasks.map((task) => <TaskItem task={task} key={task._id} />)
          ) : tasksLoaded && (!initialLoad || user) ? (
            <Typography>No tasks found</Typography>
          ) : null}
        </Grid>
      </ContentWrapper>
    </div>
  );
};

export default TaskPage;
