const fs = require('fs');

let writeLocation;
let marketList;

if (process.env.NODE_ENV === 'test') {
  writeLocation = `${__dirname}/markets.test.json`;
  marketList = JSON.parse(fs.readFileSync(writeLocation));
} else {
  writeLocation = `${__dirname}/markets.dev.json`;
  marketList = JSON.parse(fs.readFileSync(writeLocation));
}

const db = {};


/**
 * #sync - Overwrites the current database with markets list from client
 *
 * @param {Array} markets - the new market list
 * @return {Array} the list of markets
 */
db.sync = (markets) => {
  if (!Array.isArray(markets)) {
    return new Error(`Market list must be an array, received ${typeof markets}`);
  }
  if (markets.some(m => m.location === undefined || m.cards === undefined)) {
    return new Error('Missing fields on some markets');
  }
  if (markets.some(m => typeof m.location !== 'string')) {
    return new Error('TypeError in your market location');
  }
  if (markets.some(m => typeof m.cards !== 'number')) {
    return new Error('TypeError in your market cards');
  }
  db.write(markets);
  db.reset();
  return marketList;
};


/**
 * #find - Returns the entire list of markets from the appropriate
 * markets.env.json file.
 *
 * @return {Array} the list of markets
 */
db.find = () => {
  db.reset();
  return marketList;
};


/**
 * #drop - Deletes everything from the appropriate markets.env.json file and
 * writes an empty array in its place.
 */
db.drop = () => {
  marketList = [];
  db.write(marketList);
};


db.write = (data) => {
  fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
};


db.reset = () => {
  marketList = JSON.parse(fs.readFileSync(writeLocation));
};


module.exports = db;
