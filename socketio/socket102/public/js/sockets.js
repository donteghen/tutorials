let socket = io()

let form = document.getElementById('form');
let input = document.getElementById('input');
let btn = document.getElementsByTagName('button')[0]
let ul = document.getElementById('messages');
const sideDiv = document.getElementById('sideDiv')
let mylocation = ''
const messDiv = document.querySelector('#messDiv')
const messages = document.querySelector('#message-template')

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})

async function getLocation() {
  btn.setAttribute('disabled', 'disabled')
  function success (position){
    const {latitude, longitude} = position.coords
    socket.emit('JOIN', {username, room, latitude, longitude}, (error) => {
      if(error){
        alert(error);
        location.href = '/'
      }
    })
  }
  function error (){
    window.alert('failed!');
    return;
  }
  return await navigator.geolocation?.getCurrentPosition(success, error)
}

getLocation().then(() => {
  btn.removeAttribute('disabled')
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value){
    socket.emit('TEXTING', input.value, res => {
      if(res.error){
        console.log('profanity')
      }
    });
    input.value = '';
    input.focus()
  }
})


socket.on('JOINED', ({text, link, joinedAt}) => {
  console.log(text, link, joinedAt)
  const p = document.createElement('p');
  const a = document.createElement('a');
  const span = document.createElement('span')
  p.innerText = text
  p.classList = 'joinClass';
  span.innerText = moment(joinedAt).format('HH:mm');
  p.insertAdjacentElement('afterbegin', span)
  a.innerText = 'click to see location'
  a.setAttribute('href', `${link}`)
  a.setAttribute('target', '_blank');
  p.insertAdjacentElement('beforeend', a)
  sideDiv.prepend(p)
});
socket.on('LEFT', (msg)=> {
  const p = document.createElement('p');
  p.innerText = msg;
  p.classList.add('joinClass')
  sideDiv.prepend(p)
});

socket.on('TEXTED', ({sender, text, createdAt}) => {
  const li = document.createElement('li');
  //const name = document.createElement('p');
  const date = document.createElement('span');
  li.innerText = text;
  name.innerText = sender;
  date.innerText = moment(createdAt).format('HH:mm');
 
  li.insertAdjacentElement('beforeend', date)
  ul.appendChild(li)
})
