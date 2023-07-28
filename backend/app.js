import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// routes
import auth_routes from './routes/authRoutes.js'
import prop_routes from './routes/propRoutes.js'
app.use('/user', auth_routes);
app.use('/user', prop_routes);


const PORT = process.env.PORT;

const connection = async () => {
  // mongoDB connection
  await mongoose.connect(process.env.MONGO_URI);
  // server connection
  app.listen(PORT, () => {
    console.log(`Connected to PORT:${PORT}`);
  });
};

connection();
