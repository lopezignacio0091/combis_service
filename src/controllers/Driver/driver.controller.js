import {
  TABLE_RATES,
  TABLE_RESERVES,
  TABLE_TOURS,
  TABLE_USERS,
} from "../../const";
import { getConnection } from "../../database/database";

const getTrips = async (req, res) => {
  const { id: driverId } = req.params;
  const connection = await getConnection();
  const sql = `SELECT Reserves.id,origin,destination,distance,rateId,vanId,driverId,email,name,created_at
    FROM ${TABLE_RESERVES} 
    INNER JOIN ${TABLE_TOURS} ON ${TABLE_RESERVES}.tourId=${TABLE_TOURS}.id 
    INNER JOIN ${TABLE_RATES} ON ${TABLE_TOURS}.rateId=${TABLE_RATES}.id
    INNER JOIN ${TABLE_USERS} ON ${TABLE_RESERVES}.userId=${TABLE_USERS}.id
    WHERE driverId = ?
    ORDER BY created_at DESC`;

  const params = [driverId];
  const results = await connection.query(sql, params);
  res.json(results);
};

export const methods = {
  getTrips,
};
