var express = require('express');
var router = express.Router();

var db = require('../queries');

/**
 * @swagger
 * definition:
 *   Todo:
 *     properties:
 *       task:
 *         type: string
 *       status:
 *         type: integer
 */
router.get('/api/todos', db.getAllTodos);
/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags:
 *       - Todos
 *     description: Returns all todos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of todos
 *         schema:
 *           $ref: '#/definitions/Todo'
 *
 */
router.get('/api/todos/:id', db.getSingleTodo);
/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     description: Returns a single todo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Todo's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single Todo
 *         schema:
 *           $ref: '#/definitions/Todo'
 */
router.post('/api/todos', db.createTodo);
/**
 * @swagger
 * /api/todos:
 *   post:
 *     tags:
 *       - Todos
 *     description: Creates a new todo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: todo
 *         description: Todo object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Todo'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/api/todos/:id', db.updateTodo);

router.delete('/api/todos/:id', db.removeTodo);
/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     description: Deletes a single todo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Todo's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
