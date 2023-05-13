import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  group: {type: String, required: true},
  telegramAuthKey: {type: String},
  telegramId: {type: Number, default: -1},
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.telegramAuthKey = crypto.randomBytes(32).toString('hex');
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema)

