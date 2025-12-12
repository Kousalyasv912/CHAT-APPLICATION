import { join, get, leave, listRoomUsers } from '../services/userRegistry.js';
import { addMessage, getRecent } from '../services/messageStore.js';

export default function registerChatHandlers(io, socket) {
  console.log('Client connected:', socket.id);

  socket.on('join', ({ username, room }) => {
    join(socket.id, username, room);
    socket.join(room);
    socket.emit('chat_history', getRecent(room));
    io.to(room).emit('system_message', `${username} joined the room.`);
  });

  socket.on('chat_message', (text) => {
    const user = get(socket.id);
    if (!user) return;
    const payload = { username: user.username, message: text, timestamp: new Date().toISOString() };
    addMessage(user.room, payload);
    io.to(user.room).emit('chat_message', payload);
  });

  socket.on('disconnect', () => {
    const user = leave(socket.id);
    if (user) io.to(user.room).emit('system_message', `${user.username} left the room.`);
  });
}