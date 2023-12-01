import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { getConnection } from "../../database/database";
import { TABLE_SEATS, TABLE_VANS } from "../../const";

const createVan = async (req, res) => {
  try {
    const { patent, name, capacity } = req.body;
    if (!patent || !name || !capacity) {
      res.status(400).json("Bad request , Please fill all field");
    }
    const insertedId = uuidv4();
    const van = {
      id: uuidv4(),
      patent,
      capacity,
      name,
      created_at: moment().format("L"),
    };
    const connection = await getConnection();
    connection.query(`INSERT INTO ${TABLE_VANS} SET ?`, van);
    res.status(201).json({ id: insertedId , message:"Created van succesfully" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getVansAndSeatsById = async (req, res) => {
  try {
    const { id: vanId } = req.params;
    const connection = await getConnection();
    const sql = `SELECT *
                 FROM ${TABLE_VANS} 
                 INNER JOIN ${TABLE_SEATS} ON ${TABLE_VANS}.id = ${TABLE_SEATS}.vanId 
                 WHERE ${TABLE_VANS}.id = ? ORDER BY ${TABLE_SEATS}.seatNumber ASC`;
    const params = [vanId];
    const [results] = await connection.query(sql, params);
    if (results.length === 0) {
      return res.status(401).send("Seats not found");
    }
    const { id, patent, name } = results[0];
    const vanDto = {
      id,
      patent,
      name,
      seats: getPayloadSeats(results),
    };
    return res.json(vanDto);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  createVan,
  getVansAndSeatsById,
};

const getPayloadSeats = (results) => {
  const seats = [];

  for (const seat of results) {
    const newSeat = {
      status: seat.status,
      id: seat.id,
      seatNumber: seat.seatNumber,
    };
    seats.push(newSeat);
  }
  return seats;
};
