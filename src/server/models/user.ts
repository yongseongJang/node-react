import * as mongoose from 'mongoose';
import { User as IUser } from '../interfaces';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  pw: String,
  userName: String,
});

const User = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default User;
