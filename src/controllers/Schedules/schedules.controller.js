import { TABLE_SCHEDULES } from "../../const";
import { getConnection } from "../../database/database";
import { v4 as uuidv4 } from "uuid";

const getSchedules = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = `SELECT * FROM ${TABLE_SCHEDULES}`;
    const results = connection.query(sql);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createSchedule = async (req, res) => {
  try {
    const { hour } = req.body;
    if (!hour) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const schedule = {
      hour,
      id: uuidv4(),
    };
    const connection = await getConnection();
    const sql = `INSERT INTO ${TABLE_SCHEDULES} SET ?`;
    const params = [schedule];
    const results = await connection.query(sql, params);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  getSchedules,
  createSchedule,
};
