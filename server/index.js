const express = require('express');
const path = require('path');
const Pool = require('pg').Pool;
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

const clientPath = path.resolve(__dirname, '../client/dist');

app.use(express.static(clientPath));
app.use(bodyParser.json()); // Parse JSON request body

const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'linksAPI',
     password: '2485',
     port: 5433,
});

app.get('/', (req, res) => {
     // we'll do some stuff here
     res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.get('/api/links', (req, res) => {
     pool.query('SELECT * FROM favlinks', (error, results) => {
          if (error) {
               throw error;
          }
          res.status(200).json(results.rows);
     });
});

// Endpoint to add links
app.post('/api/links', (req, res) => {
     const { id, name, url } = req.body;
     pool.query(
          `INSERT INTO favlinks VALUES(${id}, '${name}', '${url}')`,
          (error, results) => {
               if (error) {
                    throw error;
               }
               res.status(200).json(results.rows);
          }
     );
});

// Endpoint to update a link
app.put('/api/links/:id', (req, res) => {
     const { name, url } = req.body;
     pool.query(
          `UPDATE favlinks SET name = '${name}', url = '${url}' WHERE id = ${req.params.id}`,
          (error, results) => {
               if (error) {
                    throw error;
               }
               res.status(200).json(results.rows);
          }
     );
});

// Endpoint to delete a link
app.delete('/api/links/:id', (req, res) => {
     pool.query(
          `DELETE FROM favlinks WHERE id = ${req.params.id}`,
          (error, results) => {
               if (error) {
                    throw error;
               }
               res.status(200).json(results.rows);
          }
     );
});

app.listen(PORT, () => {
     console.log(`Server listening on port ${PORT}`);
});
