const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const username = document.getElementById('username');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value && username.value) {
    const msg = {
      user: username.value,
      text: input.value,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    socket.emit('chat message', msg);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const item = document.createElement('div');
  const timestamp = document.createElement('span');
  timestamp.className = 'timestamp';
  timestamp.textContent = msg.time;

  if (msg.user === username.value) {
    item.className = 'my-message';
  } else {
    item.className = 'other-message';
  }

  item.textContent = `${msg.user}: ${msg.text}`;
  item.appendChild(timestamp);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
