const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/blogDB';

(async function () {
  try {
    await mongoose.connect(URI);
  } catch (e) {
    console.log(e);
  }
})();
