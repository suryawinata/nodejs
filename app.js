const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [

];

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      title: 'books',
      list: ['a', 'b'],
      books,
    });
  });
bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hellow Books Single');
  });

app.use('/books', bookRouter);
app.get('/', (_req, res) => {
  res.render('index', {
    title: 'a',
    list: ['a', 'b'],
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
