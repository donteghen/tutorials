let socket = io()
const user = window.location.pathname.substring(1)
const h4 = document.getElementById('count');
const div= document.getElementById('main');
const addBtn = document.getElementById('adder');
const subBtn = document.getElementById('subber');
const h2 = document.createElement('h2')

addBtn.addEventListener('click', (e) => {
  socket.emit('add')
})
subBtn.addEventListener('click', (e) => {
  socket.emit('subtract')
})

socket.emit('join count', user);
socket.on('joined', user => {
  h2.innerText = user;
  div.insertAdjacentElement('afterend', h2)
})
socket.on('count', count => {
  console.log('counter updated')
  h4.innerText = count;
})
