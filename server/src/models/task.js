import mongoose, { Schema } from 'mongoose';

// const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  tags: [String], // 문자열로 이루어진 배열
  serverRepoAddr: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Task = mongoose.model('Task', TaskSchema, 'fl.task');
export default Task;
