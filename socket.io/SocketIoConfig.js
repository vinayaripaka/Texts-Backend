import { Server } from 'socket.io';
const SocketIoConfig=(server)=>{
    //Websocket Server Implementation - Socket.io's
    const io=new Server(server,{
        pingTimeout:60000,
        cors:{
          origin:"*",
        },
      });

    //Socket.io Server Event Listener -- Listens to Client's Connections
      io.on("connection",(socket)=>{
        console.log(`Connected to socket.io`);

        //Adding User
         socket.on('setup',(userData)=>{
            socket.join(userData._id);
             // console.log(userData._id);
             socket.emit("connected");
          });

        //Joining Chat
         socket.on("join chat",(room)=>{
             socket.join(room);
             console.log("User Joined Room: " + room);
        });

        socket.on("typing",(room)=>socket.in(room).emit("typing"));
        socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));


        //NewMessage Validation
        socket.on("new message",(newMessageReceived)=>{
          var chat=newMessageReceived.chat;

          if(!chat.users) return console.log("Chat.users not defined");

          chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received",newMessageReceived);
          })
        });
        
      socket.off("setup",()=>{
        console.log("User Disconnected");
        socket.leave(userData._id);
      })
      });
}

export default SocketIoConfig;