import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import CreatePage from './pages/CreatePage';
import TaskDetailPage from './pages/TaskDetailPage';
import ProtectedComponent from './components/route/ProtectedRoute';
import TrainPlotPage from './pages/TrainPlotPage';
import TestPlotPage from './pages/TestPlotPage';
import SystemPlotPage from './pages/SystemPlotPage';
import GetDataPage from './pages/GetDataPage';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/data" element={<GetDataPage />} />
      <Route
        path="/task"
        element={<ProtectedComponent component={TaskPage} />}
      />
      <Route
        path="/task/create"
        element={<ProtectedComponent component={CreatePage} />}
      />
      <Route
        path="/task/:_id"
        element={<ProtectedComponent component={TaskDetailPage} />}
      />
      <Route
        path="/task/:_id/monitoring"
        element = {<TrainPlotPage/>}
      />
      <Route
        path="/task/:_id/global-model"
        element = {<TestPlotPage/>}
      />
      <Route
        path="/task/:_id/systemplot"
        element = {<SystemPlotPage/>}
      />
    </Routes>
    
  );
};

export default App;
