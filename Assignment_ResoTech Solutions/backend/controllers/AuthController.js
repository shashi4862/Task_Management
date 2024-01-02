const db = require("../db/database");

exports.registerController = async (req, res) => {
  const q = "INSERT INTO users SET ?";
  const { userName, password } = req.body;

  db.query(q, { userName, password }, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).send({
      success: true,
      result,
    });
  });
};

exports.createTable = (req, res) => {
  let q =
    "CREATE TABLE users(id int AUTO_INCREMENT, userName VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body; // Access user-provided credentials
    console.log(userName, password);
    const q = `SELECT id,userName FROM users where userName=\'${userName}\' AND password=\'${password}\'`;

    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ message: "Internal server error" }); // Send generic error response
  }
};
