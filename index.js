import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { notFound,errorHandler } from "./middlewares/errorMiddlewares.js";
import SocketIoConfig from "./socket.io/SocketIoConfig.js";
import http from 'http';


const app = express();
const server=http.createServer(app);

dotenv.config();
app.use(cors());
app.use(express.json());

//PORT's
const PORT = process.env.PORT;
const URL=process.env.URL;

app.get("/", (req, res) => {
  res.send("Hello World!");
});



//Server Intialisation
const StartServer=async()=>{
    try{

      //Server Connection --- Node's
          server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });

    //Database Connection --- MongoDB's
        await mongoose.connect(URL)
        console.log('MongoDB Connected!');
    
    //WebSocket Configuration
      SocketIoConfig(server);
    }
    catch(err){
        console.log(err.message);
    }
}

StartServer();

//API's
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);




//Error Handling 
app.use(notFound);
app.use(errorHandler);