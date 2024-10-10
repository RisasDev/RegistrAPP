const express = require('express');
const mongoDB = require('mongodb');
const cors = require('cors'); // Para permitir peticiones desde el frontend (Angular)

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://registrapp:AtZfuO83i20uywvI@cluster0.rlyyswu.mongodb.net/';
let db, usersCollection;

async function connectToDatabase() {
  try {
    const client = new mongoDB.MongoClient(uri);
    await client.connect();
    db = client.db('RegistrAPP');
    usersCollection = db.collection('users');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
}

connectToDatabase();

app.get('/api/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = req.body;
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});

app.listen(3000, () => {
  console.log('Servidor backend ejecutándose en el puerto 3000');
});