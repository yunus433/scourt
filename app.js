const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const airtable = require('airtable');
const favicon = require('serve-favicon');
const helmet = require('helmet');

const app = express();

const indexRouteController = require('./routes/indexRoute');
const englishRouteController = require('./routes/englishRoute');

dotenv.config({path: path.join(__dirname, '.env')});

const base = new airtable({apiKey:'keyKcUWJzmFWttJZw'}).base('appnel3k2hx34yMk6');

const {
  PORT
} = process.env;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use((req, res, next) => {
  req.base = base;
  next();
});

app.use(helmet());

app.use('/', indexRouteController);
app.use('/english', englishRouteController);

app.listen(PORT, () => {
  console.log(`Port on ${PORT}`);
})

