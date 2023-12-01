import { TABLE_RATES } from "../../const";
import { getConnection } from "../../database/database";
import { v4 as uuidv4 } from "uuid";

const getRates = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = `SELECT * FROM ${TABLE_RATES}`;
    const results = await connection.query(sql);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createRate = async (req, res) => {
  try {
    const { price } = req.body;
    if (!price) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const rate = {
      price,
      id: uuidv4(),
    };
    const connection = await getConnection();
    const sql = `INSERT INTO ${TABLE_RATES} SET ?`;
    const params = [rate];
    const results = await connection.query(sql, params);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  getRates,
  createRate,
};
