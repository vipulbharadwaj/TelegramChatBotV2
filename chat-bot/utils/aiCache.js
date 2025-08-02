const cache = new Map(); // Stores text -> AI response

module.exports = {
  get: (text) => cache.get(text),
  set: (text, response) => cache.set(text, response),
  has: (text) => cache.has(text)
};