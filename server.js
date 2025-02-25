const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'farm_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Farm Management System API Running...');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
