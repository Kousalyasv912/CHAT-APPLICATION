const users = new Map();

export function join(socketId, username, room) {
  users.set(socketId, { username, room });
  return users.get(socketId);
}

export function get(socketId) {
  return users.get(socketId);
}

export function leave(socketId) {
  const user = users.get(socketId);
  users.delete(socketId);
  return user;
}

export function listRoomUsers(room) {
  return [...users.values()].filter(u => u.room === room);
}