// Data saved as JSON (in localStorage). 
// to be done: clearAll

const STORAGE_KEY = "pocketTrackData";

export const Storage = {
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));// trans data to string and save in JSON
  },

  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];// trans to js object
  }
};
