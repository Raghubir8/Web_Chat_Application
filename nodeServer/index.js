// node server which will handle socket io
const io = require('socket.io')(8000,{
    cors:{
        origin:"*"
    }
})

const users = {};

io.on('connection', socket => {
    //If any new user joins the chat, let them know whoever is connected with server!
    socket.on('new-user-joined', hh => {
      //  console.log("new user", hh);
        users[socket.id] = hh;
        socket.broadcast.emit('user-joined', hh);
    });
    socket.on('send', message => {
        //If someone send the message,broadcast it to other people !
        socket.broadcast.emit('receive', { message: message, hh: users[socket.id] })
    }); 

    socket.on('disconnect', message => {
        // If someone left the chat,let all of know connected with server ! 
        socket.broadcast.emit('left', users[socket.id])
        delete users [socket.id];
    }); 
});


