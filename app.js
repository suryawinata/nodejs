const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const nav = [
  {
    link: '/books',
    title: 'books',
  },
  {
    link: '/authors',
    title: 'Authors',
  },
];


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (_req, res) => {
  res.render('index', {
    title: 'a',
    list: ['a', 'b'],
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
