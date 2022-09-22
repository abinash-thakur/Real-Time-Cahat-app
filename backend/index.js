//node server which handel the realtime chat application
const io = require('socket.io')(8000,
    {
    cors: {
        origin: "*"
      }
    });
const user = {};

io.on('connection',Socket=>{
    Socket.on('new-user-joined',name=>{
        user[Socket.id]=name;
        Socket.broadcast.emit('user-joined',name);
    });
   Socket.broadcast.emit('user-online',user);

    Socket.on('send',message=>{
        Socket.broadcast.emit('receiv',{message:message,name:user[Socket.id]});
    });
    Socket.on('disconnect',message =>{
        Socket.broadcast.emit('left',{name:user[Socket.id]});
        delete user[Socket.id];
      });
});