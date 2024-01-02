const express = require('express');
const router = express.Router();
const { createDB, test, createTable, createList, showTasks, singleTask, updateTask, deleteSingleTask, toggleController } = require('../controllers/T_M_controller');

//ROUTES
router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/tasks', showTasks);
router.get('/task/:id', singleTask);
router.put('/update/task/:id', updateTask);
router.delete('/delete/task/:id', deleteSingleTask);
router.get('/test', test)
router.put('/toggle/:id', toggleController);
module.exports = router;


