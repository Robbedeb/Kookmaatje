const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware for parsing JSON data
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors({
  origin: 'http://127.0.0.1:5173', // Replace with the URL of your React application
  methods: 'GET,POST,DELETE,PUT',
}));

// Configure multer to store images in a specific directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename without adding a timestamp
  }
});

const upload = multer({ storage: storage });

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kookmaatje'
});

// POST route to save the data
app.post('/api/data', upload.single('image'), (req, res) => {
  const { title, description, ingredients } = req.body;
  const image = req.file.filename; // Get the filename of the uploaded image

  // Execute the query to store the data in the database
  const query = `INSERT INTO recipes (title, description, ingredients, image) VALUES (?, ?, ?, ?)`;
  const values = [title, description, ingredients, image];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('An error occurred while saving the data to the database:', error);
      res.status(500).json({ message: 'An error occurred while saving the data.' });
    } else {
      console.log('Data successfully saved to the database.');
      res.status(200).json({ message: 'Data successfully saved to the database.' });
    }
  });
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM recipes'; // Query om alle recepten op te halen

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de recepten uit de database:', error);
      res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van de recepten.' });
    } else {
      console.log('Recepten zijn succesvol opgehaald uit de database.');
      res.status(200).json(results);
    }
  });
});

app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM recipes WHERE id = ?'; // Query om een specifiek recept op te halen

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Er is een fout opgetreden bij het ophalen van het recept uit de database:', error);
      res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van het recept.' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Recept niet gevonden.' });
    } else {
      console.log('Recept is succesvol opgehaald uit de database.');
      res.status(200).json(results[0]);
    }
  });
});



app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM recipes WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Er is een fout opgetreden bij het verwijderen van het recept uit de database:', error);
      res.status(500).json({ message: 'Er is een fout opgetreden bij het verwijderen van het recept.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Recept niet gevonden.' });
    } else {
      console.log('Recept is succesvol verwijderd uit de database.');
      res.status(200).json({ message: 'Recept is succesvol verwijderd.' });
    }
  });
});

app.put('/api/data/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, description, ingredients } = req.body;
  const image = req.file && req.file.filename; // Krijg de bestandsnaam van de geüploade afbeelding (indien geüpload)

  // Bouw de SQL-query op basis van de bijgewerkte gegevens
  let query = 'UPDATE recipes SET';
  const values = [];

  if (title) {
    query += ' title = ?,';
    values.push(title);
  }

  if (description) {
    query += ' description = ?,';
    values.push(description);
  }

  if (ingredients) {
    query += ' ingredients = ?,';
    values.push(ingredients);
  }

  if (image) {
    query += ' image = ?,';
    values.push(image);
  }

  // Verwijder de laatste komma uit de query
  query = query.slice(0, -1);

  // Voeg de WHERE-clausule toe aan de query om het juiste recept bij te werken
  query += ' WHERE id = ?';
  values.push(id);

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Er is een fout opgetreden bij het bijwerken van het recept in de database:', error);
      res.status(500).json({ message: 'Er is een fout opgetreden bij het bijwerken van het recept.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Recept niet gevonden.' });
    } else {
      console.log('Recept is succesvol bijgewerkt in de database.');
      res.status(200).json({ message: 'Recept is succesvol bijgewerkt.' });
    }
  });
});


// Statische bestanden (zoals afbeeldingen) serveren vanuit de "uploads" map
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start de server
app.listen(port, () => {
  console.log(`Server is gestart op poort ${port}`);
});
