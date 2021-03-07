/* eslint no-unused-vars: 0 */
const path = require('path');
const express = require('express');
const db = require('./db/markets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.json());

app.put('/markets', (req, res, next) => {
  const syncResult = db.sync(req.body);
  if (syncResult instanceof Error) {
    return next({ code: 400, error: syncResult });
  }
  res.json(syncResult);
});

app.get('/markets', (req, res) => {
  res.json(db.find());
});

app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error });
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
