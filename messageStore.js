const history = new Map();
const MAX_MESSAGES = 100;

export function addMessage(room, payload) {
  const arr = history.get(room) || [];
  arr.push(payload);
  if (arr.length > MAX_MESSAGES) arr.shift();
  history.set(room, arr);
}

export function getRecent(room, limit = 20) {
  const arr = history.get(room) || [];
  return arr.slice(-limit);
}
