import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { getConnection } from "../../database/database";
import { TABLE_USERS } from "../../const";

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await getConnection();
    // Find the user by their username in the database
    const sql = `SELECT * FROM ${TABLE_USERS} WHERE email = ?`;
    const params = [email];
    const results = await connection.query(sql, params);
    if (results.length === 0) {
      return res.status(401).send("User not found");
    }
    const user = results[0];
    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.hashpassword);
    // Passwords don't match, authentication failed
    if (!passwordMatch) return res.status(401).send("Authentication failed");
    const token = jwt.sign({ username: user.email }, "secret", {
      expiresIn: "1h",
    });
    return res.json({
      name: user.name,
      email: user.email,
      id: user.id,
      rol: user.rol,
      token,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, password , rol , domicile } = req.body;
    if (!email || !name || !password || !rol || !domicile) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const hash = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      hashpassword: hash,
      email,
      name,
      rol,
      domicile
    };
    const connection = await getConnection();
    const sql = `INSERT INTO ${TABLE_USERS} SET ?`;
    const params = [user];
    connection.query(sql, params);
    res.json({ message: "Created user successfully" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const connection = await getConnection();
    const sql = `UPDATE ${TABLE_USERS}
    SET hashpassword = ?
    WHERE id = ?`;
    const params = [hash, id];
    connection.query(sql, params);
    res.json({ message: "Change password successfully" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUserByToken = async (req, res) => {
  try {
    const { username: email } = req.user;
    console.log(email); // Datos del usuario decodificados desde el token
    const sql = `SELECT * FROM ${TABLE_USERS} WHERE email = ?`;
    const params = [email];
    const connection = await getConnection();
    const results = await connection.query(sql, params);
    if (results.length === 0) {
      return res.status(401).send("User not found");
    }
    const { hashpassword, ...user } = results[0];
    res.json(user);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getUser,
  createUser,
  changePassword,
  getUserByToken,
};
