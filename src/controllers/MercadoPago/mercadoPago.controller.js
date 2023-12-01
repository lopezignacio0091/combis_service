import config from "../../config";
const mercadopago = require("mercadopago");

const createPreference = async (req, res) => {
  const preference = {
    items: req.body.data,
    back_urls: {
      success: "http://localhost:8100/reserve/success",
      //   failure: "http://localhost:8080/feedback",
      pending: "http://localhost:8100/reserve/pending",
    },
    auto_return: "approved",
  };
  mercadopago.configurations.setAccessToken(config.accessToken);
  mercadopago.preferences
    .create(preference)
    .then((result) => res.json(result.response.id))
    .catch((error) => console.log(error));
};
export const methods = {
  createPreference,
};
