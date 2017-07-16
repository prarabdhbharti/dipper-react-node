var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:hahaha1@localhost:5432/todos';
var db = pgp(connectionString);

// add query functions
function getAllTodos(req, res, next) {
  db.any('select * from todos')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Todos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleTodo(req, res, next) {
  var todoID = parseInt(req.params.id);
  db.one('select * from todos where id = $1', todoID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createTodo(req, res, next) {
  db.none('insert into todos(status, task)' +
      'values(${status}, ${task})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateTodo(req, res, next) {
  db.none('update todos set status=$1, task=$2 where id=$3',
    [req.body.status, req.body.task, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeTodo(req, res, next) {
  var todoID = parseInt(req.params.id);
  db.result('delete from todos where id = $1', todoID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} todo`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllTodos: getAllTodos,
  getSingleTodo: getSingleTodo,
  createTodo: createTodo,
  updateTodo: updateTodo,
  removeTodo: removeTodo
};