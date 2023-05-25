import mongoose, { Schema } from 'mongoose';

// const { Schema } = mongoose;

const TrainSchema = new Schema({
  fl_task_id: String,
  client_mac: String,
  round: Number,
  train_loss: Number,
  train_acc: Number,
  train_time: Number,
});

const Train = mongoose.model('Train', TrainSchema, 'fl.fl-client_train_result_log');
export default Train;
