const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'siva@123',
    host: 'localhost',
    port: 5432,
    database: 'Customer',
});

client.connect()
    .then(() => {
        console.log("Postgresql database was connected");
    })
    .catch((err) => {
        console.log("error in databases", err);
    });

module.exports = client;
