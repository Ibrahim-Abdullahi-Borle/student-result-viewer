// DELETE student
app.delete('/api/students/:id', (req, res) => {
  let students = readStudents();
  const id = req.params.id;
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  students.splice(index, 1);
  writeStudents(students);
  res.json({ message: "Student deleted" });
});

// UPDATE student
app.put('/api/students/:id', (req, res) => {
  let students = readStudents();
  const id = req.params.id;
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const updatedStudent = req.body;
  students[index] = updatedStudent;
  writeStudents(students);
  res.json({ message: "Student updated", student: updatedStudent });
});
