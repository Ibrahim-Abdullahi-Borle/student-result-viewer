const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'students.json');

// Helper to read students.json
function readStudents() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data).students;
}

// Helper to write to students.json
function writeStudents(students) {
  fs.writeFileSync(dataPath, JSON.stringify({ students }, null, 2));
}

// GET all students
app.get('/api/students', (req, res) => {
  const students = readStudents();
  res.json({ students });
});

// GET student by ID
app.get('/api/students/:id', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// SEARCH student by name
app.get('/api/search', (req, res) => {
  const { name } = req.query;
  const students = readStudents();
  const result = students.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
});

// ADD new student
app.post('/api/students', (req, res) => {
  const students = readStudents();
  const newStudent = req.body;

  if (!newStudent.id || !newStudent.name || !newStudent.grade || !newStudent.results) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  students.push(newStudent);
  writeStudents(students);
  res.status(201).json({ message: 'Student added successfully', student: newStudent });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
