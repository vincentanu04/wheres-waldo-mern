import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Account = mongoose.model('Account', AccountSchema);

export default Account;
