import Router from 'koa-router';
import * as tasksCtrl from './tasks.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const tasks = new Router();

tasks.get('/', checkLoggedIn, tasksCtrl.list);
tasks.post('/', checkLoggedIn, tasksCtrl.create);

const task = new Router(); // /api/tasks/:id
task.get('/', tasksCtrl.read);
task.delete('/', checkLoggedIn, tasksCtrl.checkOwnTask, tasksCtrl.remove);
task.patch('/', checkLoggedIn, tasksCtrl.checkOwnTask, tasksCtrl.update);

tasks.use('/:id', tasksCtrl.getTaskById, task.routes());

export default tasks;
