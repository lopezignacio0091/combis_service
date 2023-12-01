import { v4 as uuidv4 } from "uuid";
import { TABLE_TOURS, TABLE_VANS, TABLE_SEATS, TABLE_USERS, TABLE_RATES } from "../../const";
import { getConnection } from "../../database/database";

const getRoutes = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql = `
    SELECT Tours.id,origin,destination,distance,rateId,vanId,driverId,email,name,rol,price
    FROM ${TABLE_TOURS}
    INNER JOIN ${TABLE_USERS} ON ${TABLE_TOURS}.driverId = ${TABLE_USERS}.id 
    INNER JOIN ${TABLE_RATES} ON ${TABLE_TOURS}.rateId = ${TABLE_RATES}.id 

  `;
    const results = await connection.query(sql);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createRoute = async (req, res) => {
  try {
    const { origin, destination, distance, rateId, vanId } = req.body;
    if (!origin || !destination || !distance || !vanId || !rateId) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const tour = {
      id: uuidv4(),
      origin,
      destination,
      distance,
      rateId,
      vanId,
    };
    const connection = await getConnection();
    const sql = `INSERT INTO ${TABLE_TOURS} SET ?`;
    const params = [tour];
    const results = await connection.query(sql, params);
    return res.json(results);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  getRoutes,
  createRoute,
};
