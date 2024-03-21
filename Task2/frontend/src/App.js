import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [viewNotes, setViewNotes] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); 

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:3001/api/notes');
    setNotes(response.data);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post('http://localhost:3001/api/notes', newNote);
    fetchNotes();
    setNewNote({ title: '', body: '' });
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:3001/api/notes/${id}`);
    fetchNotes();
  };

  const handleViewNotes = () => {
    setViewNotes(true);
  };

  const handleEditNote = note => {
    setEditNote(note);
    setShowEditForm(true); 
  };

  const handleUpdateNote = async () => {
    await axios.put(`http://localhost:3001/api/notes/${editNote.id}`, editNote);
    fetchNotes();
    setEditNote(null);
    setShowEditForm(false); 
  };

  return (
    <div className="container">
      <h1>Notes</h1>
      {!viewNotes ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={newNote.title} onChange={handleInputChange} placeholder="Title" required />
          <textarea name="body" value={newNote.body} onChange={handleInputChange} placeholder="Body" required></textarea>
          <button type="submit">Save</button>
          <button onClick={handleViewNotes}>View Notes</button>
        </form>
      ) : (
        <div>
          <button onClick={() => setViewNotes(false)}>Back to Form</button>
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <div>
                  <h3 style={{ display: 'inline', marginRight: '10px' }}>{note.title}</h3>
                  <p>{note.body}</p>
                  <span onClick={() => handleEditNote(note)} style={{ cursor: 'pointer' }}>🖊️</span>
                </div>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showEditForm && editNote && (
        <div className="edit-form">
          <input type="text" name="title" value={editNote.title} onChange={e => setEditNote({ ...editNote, title: e.target.value })} required />
          <textarea name="body" value={editNote.body} onChange={e => setEditNote({ ...editNote, body: e.target.value })} required></textarea>
          <button onClick={handleUpdateNote}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default App;
