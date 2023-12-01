import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { getConnection } from "../../database/database";
import { TABLE_SEATS } from "../../const";

const createSeat = async (req, res) => {
  try {
    const { vanId, status, seatNumber } = req.body;
    if (!vanId || !status || !seatNumber) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const seat = {
      id: uuidv4(),
      seatNumber,
      status,
      vanId,
      created_at: moment().format("L"),
    };
    const connection = await getConnection();
    const sql = `INSERT INTO ${TABLE_SEATS} SET ?`;
    const params = [seat];
    connection.query(sql, params);
    res.json({ message: "Create seat succesfuly" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      res.status(401).json("Please provide the ID");
    }
    const connection = await getConnection();
    const sql = `UPDATE ${TABLE_SEATS}
    SET status = ?
    WHERE id = ?`;
    const params = [status, id];
    await connection.query(sql, params);
    return res.json("Success Reserve");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  createSeat,
  changeStatus,
};
