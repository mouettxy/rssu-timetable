import mongoose from 'mongoose';

export function connectToDb() {
  const connectionString = 'mongodb://user:pass@127.0.0.1:27018/timetable?authSource=admin';

  return new Promise((resolve) => {
    mongoose
      .connect(connectionString, {useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Database connection successful');
        resolve(true)
      })
      .catch((err) => {
        console.error(err)
        console.error('Database connection error');
        resolve(false)
      });
  })
}