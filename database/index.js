const { Client } = require("pg");

const clientConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT),
    ssl: { rejectUnauthorized: (process.env.DATABASE_SSL === 'true')  }
    // ssl: { rejectUnauthorized: true  }
};

const client = new Client(clientConfig);
client.connect();

module.exports = client;