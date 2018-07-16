const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://swinata:Insolent01@ds117101.mlab.com:17101/tokosahabat';
      const dbName = 'tokosahabat';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();
          debug(books);
          res.render('bookListView', {
            books,
            nav,
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://swinata:Insolent01@ds117101.mlab.com:17101/tokosahabat';
      const dbName = 'tokosahabat';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render('bookView', {
            nav,
            book,
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return bookRouter;
}
module.exports = router;
