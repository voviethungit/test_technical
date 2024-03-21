let notes = [];

const createNote = (req, res) => {
  const { title, body } = req.body;
  const newNote = { id: notes.length + 1, title, body };
  notes.push(newNote);
  res.status(201).json(newNote);
};

const getAllNotes = (req, res) => {
  res.status(200).json(notes);
};

const updateNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, body } = req.body;
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex === -1) {
    res.status(404).json({ error: 'Note not found' });
  } else {
    notes[noteIndex] = { ...notes[noteIndex], title, body };
    res.status(200).json(notes[noteIndex]);
  }
};

const deleteNote = (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === noteId);
  if (index === -1) {
    res.status(404).json({ error: 'Note not found' });
  } else {
    notes.splice(index, 1);
    res.status(200).json({success: 'delete !'});
  }
};

module.exports = { createNote, getAllNotes, updateNote, deleteNote };
