const socket = io('/');

const getElementsById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementsById('hello_stranger');
const chattingBoxElement = getElementsById('chatting_box');
const formElement = getElementsById('chat_form');

socket.on('new_connected', (username) => {
    console.log(username);
})

const drawHelloStrange = (username) => (helloStrangerElement.innerText = `Hello ${username} :)`);

function helloUser(){
    const username = prompt('Please enter your name');
    socket.emit('new_user', username, (data) => {
        drawHelloStrange(data);
        console.log(data);
    });
}
function init(){
    helloUser();
}

init();