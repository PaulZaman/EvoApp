var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// User routes
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Uses routes
var useRouter = require('./routes/use');
app.use('/use', useRouter);

// Utensils routes
var utensilsRouter = require('./routes/utensils');
app.use('/utensils', utensilsRouter);

// Event routes
var eventRouter = require('./routes/event');
app.use('/event', eventRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {

  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* BEGIN db initialization */
const Op = {}
const connection = require("./db.js");
/* END db initialization */



// INITIALISE DATABASE TABLES
const { Sequelize } = require('sequelize');
const { Use, Utensil, User, Participation, Event, Session } = require("./models");

// associations
User.belongsToMany(Utensil, { through: { model: Use, unique: false } });
Utensil.belongsToMany(User, { through: { model: Use, unique: false } });
Use.belongsTo(User);
Use.belongsTo(Utensil);
Utensil.hasMany(Use);
User.hasMany(Use);

User.belongsToMany(Event, { through: { model: Participation, unique: false } });
Event.belongsToMany(User, { through: { model: Participation, unique: false } });
Participation.belongsTo(User);
Participation.belongsTo(Event);
Event.hasMany(Participation);
User.hasMany(Participation);

Event.hasOne(User, { foreignKey: 'organisatorId' });
User.hasMany(Event, { foreignKey: 'organisatorId' });

Session.belongsTo(User);

async function syncDB() {
  await connection.sync({ force: true, alter: true });
  createData()
}

// import and create data
var {users, utensils, uses, events, participation} = require('./Object.js');

function createData() {
  console.log("-----------------Creating data-----------------");
  console.log(users);
  // fill database
  for (let i = 0; i < users.length; i++) {
    User.create(users[i]);
  }
  for (let i = 0; i < utensils.length; i++) {
    Utensil.create(utensils[i]);
  }
  for (let i = 0; i < uses.length; i++) {
    Use.create(uses[i]);
  }
  for (let i = 0; i < events.length; i++) {
    Event.create(events[i]);
  }
  for (let i = 0; i < participation.length; i++) {
    Participation.create(participation[i]);
  }
}

syncDB();

module.exports = app;
