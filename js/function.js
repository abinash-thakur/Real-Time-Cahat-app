const socket = io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageinp=document.getElementById('messageInp');
const sendbtn=document.getElementById('sendbtn');
const messagecontainer=document.querySelector('.contianer');

var audio = new Audio('sample.mp3');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageinp.value;
  append(`You: ${message}`,'right');
  socket.emit('send',message);
  messageinp.value='';
})

const append = (message,position)=>{
  console.log("calling");
  const messageElement = document.createElement('div');
  messageElement.innerText=message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
  if(position=='left')
  {
    audio.play();
  }
}

const username=prompt("Enter your name to join");
socket.emit('new-user-joined',username);

socket.on('user-joined',name=>{
  append(`${name} Join the chat`,'right');
});

socket.on('receiv',data=>{
  append(`${data.name}: ${data.message}`,'left');
});

socket.on('left',data=>{
  append(`${data.name}: is left from the chat`,'left');
});
