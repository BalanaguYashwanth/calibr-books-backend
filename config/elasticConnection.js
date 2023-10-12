const { Client } = require("@elastic/elasticsearch");

const connectElastic = () => {
  const client = new Client({
    cloud: {
      id: process.env.ELASTIC_CLOUD_ID,
    },
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    },
  });
  return client;
};

module.exports = connectElastic;
