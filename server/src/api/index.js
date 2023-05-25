import Router from 'koa-router';
import auth from './auth';
import tasks from './tasks';
import trains from './trains';

const api = new Router();

api.use('/tasks', tasks.routes());
api.use('/auth', auth.routes());
api.use('/trains', trains.routes());

// 라우터를 내보냅니다.
export default api;
