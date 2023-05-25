import Router from 'koa-router';
import * as trains_Ctrl from './trains_Ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const trains = new Router();
const train = new Router(); // /api/tasks/:id - 
trains.use('/:id', trains_Ctrl.getTaskById, train.routes());

export default trains;
