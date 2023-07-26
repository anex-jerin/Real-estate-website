import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes import 

import auth_routes from './routes/authRoutes.js'
// app.use('/', (req,res)=>{
//   res.json('hi there')
// });
app.use('/user', auth_routes);


const PORT = process.env.PORT;

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Connected to PORT:${PORT}`);
  });
};

connection();
