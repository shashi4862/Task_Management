const db = require("../db/database");

//CREATE DB
exports.createDB = (req, res) => {
  let q = "CREATE DATABASE T_Management_System";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB created");
  });
  res.send("ok");
};

exports.createTable = (req, res) => {
  let q =
    "CREATE TABLE tasks(id int AUTO_INCREMENT, task VARCHAR(255), taskDisc VARCHAR(255), completed BOOLEAN DEFAULT FALSE, PRIMARY KEY(id))";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

exports.createList = (req, res) => {
  const q = "INSERT INTO tasks SET ?";
  const { task, taskDisc } = req.body;

  db.query(q, { task, taskDisc }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

exports.showTasks = (req, res) => {
  const q = "SELECT * FROM tasks";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

exports.singleTask = (req, res) => {
  const q = `SELECT * FROM tasks where id=${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result[0]);
  });
};

exports.updateTask = (req, res) => {
  const { task, taskDisc } = req.body;

  const q = `UPDATE tasks SET ? where id = ${req.params.id}`;

  db.query(q, { task, taskDisc }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

exports.deleteSingleTask = (req, res) => {
  const q = `DELETE FROM tasks WHERE id = ${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "todo delete" });
  });
};

exports.test = async (req, res) => {
  res.status(200).send({
    success: true,
    msg: "working done",
  });
};

exports.toggleController = async (req, res) => {
  const q = `UPDATE tasks SET completed = CASE WHEN completed THEN FALSE ELSE TRUE END
    WHERE id = ${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "toggled" });
  });
};
