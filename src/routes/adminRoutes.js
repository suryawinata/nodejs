const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const books = [{
  name: 'surya',
  year: 2017,
},
{
  name: 'Vindo',
  year: 2017,
},
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://swinata:Insolent01@ds117101.mlab.com:17101/tokosahabat';
      const dbName = 'tokosahabat';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
