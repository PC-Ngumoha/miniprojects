const mongoose = require('mongoose');

let uri;

switch (process.env.NODE_ENV) {
  case 'development':
    uri = process.env.DEV_DB_PATH;
    break;

  case 'test':
    uri = process.env.TEST_DB_PATH;
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
