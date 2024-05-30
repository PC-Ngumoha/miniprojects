const mongoose = require('mongoose');

let uri;

switch (process.env.NODE_ENV) {
  case 'development':
    uri = 'mongodb://127.0.0.1:27017/blogDB';
    console.log('Currently using Dev DB');
    break;

  case 'test':
    uri = 'mongodb://127.0.0.1:27017/testDB';
    console.log('Currently using Test DB');
    break;
}

(async function () {
  try {
    console.log
    await mongoose.connect(uri);
  } catch (e) {
    console.log(e);
  }
})();
