const { Client } = require("pg");

const clientConfig = {
    host: "ec2-18-235-4-83.compute-1.amazonaws.com",
    user: "jyuemxvqhgejaw",
    database: "ddedpf5fk8ccej",
    password: "a45157b923e3ead0a465a3c92f06171613d7b9256df3c955dfb03ca237daa820",
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

const client = new Client(clientConfig);
client.connect();

module.exports = client;