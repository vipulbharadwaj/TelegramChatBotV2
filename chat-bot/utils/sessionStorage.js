// utils/sessionStorage.js
const userProfiles = new Map();

module.exports = {
  getProfile: (userId) => {
    return userProfiles.get(userId) || {}; 
  },
  setProfile: (userId, data) => {
    const currentProfile = userProfiles.get(userId) || {};
    userProfiles.set(userId, { ...currentProfile, ...data });
  }
};