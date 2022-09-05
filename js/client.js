const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//Audio will play on receiving message !
var audio = new Audio('sound.mp3');

//Function which will append to the container !

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
    }
}

   form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value = ''
})
//Ask new user for his/her and let the server know !

const hh = prompt("enter your name to join");
socket.emit('new-user-joined',hh);

//If a new user joins,receive his/her name from the server !

socket.on('user-joined',hh=>{
    append(`${hh} joined the chat`,'right')
});

// If server send a message receive it !

socket.on('receive',data=>{
    append(`${data.hh}: ${data.message}`,'left');
});

// If user leave the chat,let all know user who connected with server !

socket.on('left',hh=>{
    append(`${hh} left the chat`,'left');
});


    
    
