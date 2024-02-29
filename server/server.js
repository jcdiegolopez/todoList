const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const conectarDB = require('./config/database');
const cors = require('cors');



const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());
conectarDB();

const taskSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaEntrega: Date,
  estado: String,
  edit: Boolean,
});

const Task = mongoose.model('Task', taskSchema);


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  const { titulo, descripcion, fechaEntrega, estado, edit } = req.body;
  const newTask = new Task({ titulo, descripcion, fechaEntrega, estado, edit });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fechaEntrega, edit } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, {
        titulo,
        descripcion,
        fechaEntrega,
        edit
      }, { new: true });
  
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task info:', error);
      res.status(500).json({ error: 'Error updating task info' });
    }
  });

  app.put('/tasks/:id/done', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { estado: 'Done' }, { new: true });
  
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task state:', error);
      res.status(500).json({ error: 'Error updating task state' });
    }
  });
  
  
  app.put('/tasks/:id/state', async (req, res) => {
    const { id } = req.params;
    
    const data = await Task.findById(id);
    const estado = data.estado === 'In Progress' ? 'Todo' : 'In Progress'
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { estado: estado }, { new: true });
  
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task state:', error);
      res.status(500).json({ error: 'Error updating task state' });
    }
  });
  
 
    app.put('/tasks/:id/editable', async (req, res) => {
    const { id } = req.params;

    try {
        
        const updatedTask = await Task.findByIdAndUpdate(id, { edit: true }, { new: true });

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task editable state:', error);
        res.status(500).json({ error: 'Error updating task editable state' });
    }
    });


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
