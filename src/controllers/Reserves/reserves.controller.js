import moment from "moment";
import { TABLE_RATES, TABLE_RESERVES, TABLE_TOURS } from "../../const";
import { getConnection } from "../../database/database";
import { v4 as uuidv4 } from "uuid";

const createReserve = async (req, res) => {
  try {
    const { userId, tourId, seatId, date , alternativeDomicile } = req.body;
    if (!userId || !tourId || !seatId || !date ) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const reserveId = uuidv4();
    const reserve = {
      id: reserveId,
      userId,
      tourId,
      seatId,
      status: "pending",
      created_at: date,
      alternativeDomicile
    };
    const connection = await getConnection();
    const result = await connection.query(
      `INSERT INTO ${TABLE_RESERVES} SET ?`,
      reserve
    );
    const insertedId = result.insertId;

    // Fetch the inserted data based on the inserted ID or any other criteria if needed
    await connection.query(`SELECT * FROM ${TABLE_RESERVES} WHERE id = ?`, [
      insertedId,
    ]);
    res.json({ message: "Created reserve successfully", id: reserveId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getByUser = async (req, res) => {
  const { id: useId } = req.params;
  const connection = await getConnection();
  const sql = `SELECT *
  FROM ${TABLE_RESERVES} 
  INNER JOIN ${TABLE_TOURS} ON ${TABLE_RESERVES}.tourId=${TABLE_TOURS}.id 
  INNER JOIN ${TABLE_RATES} ON ${TABLE_TOURS}.rateId=${TABLE_RATES}.id
  WHERE userId = ?
  ORDER BY created_at DESC`;

  const params = [useId];
  const [results] = await connection.query(sql, params);
  res.json(results);
};

const setStatus = async (req, res) => {
  const { id: reserveId } = req.params;
  const connection = await getConnection();
  const sql = `UPDATE ${TABLE_RESERVES} 
  SET status = 'final'
  WHERE id = ?;
`;
  const params = [reserveId];
  const [results] = await connection.query(sql, params);
  res.json(results);
};

export const methods = {
  createReserve,
  getByUser,
  setStatus,
};
