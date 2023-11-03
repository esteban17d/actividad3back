const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'universidad',
  host: 'localhost',
  database: 'actividad3',
  password: '1234',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));

ruta_raiz_front = '/home/estebang17/Documents/actividad 3 programación/actividad3programacion/actividad3front'

app.use(express.static(ruta_raiz_front));

app.get('/', (req, res) => {
  res.sendFile(ruta_raiz_front + '/index.html');
});

app.post('/registro', (req, res) => {
  const { registro__email, registro__password } = req.body;
  const query = 'INSERT INTO usuarios (email, password) VALUES ($1, $2)';

  pool.query(query, [registro__email, registro__password], (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack);
    }

    res.sendFile(ruta_raiz_front + '/iniciar_sesion.html');
  });
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
