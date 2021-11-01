import { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import Filters from "./components/Filters";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const api = process.env.REACT_APP_API || "http://localhost:3001";

  useEffect(() => {
    fetchAll();
  }, []);

//   useEffect(() => {
//     console.log("should force update");
//   }, [notes]);

  const fetchAll = () => {
    fetch(`${api}/notes`)
      .then((res) => res.json())
      .then((res) => setNotes(res.notes));
  };

  const addNote = (text) => {
    const newNote = { text };
    fetch(`${api}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((res) => setNotes([...notes, res.newNote]));
  };

  const updateNote = (id, text) => {
    fetch(`${api}/note`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text }),
    })
      .then((res) => res.json())
      .then((res) => setNotes(notes.map((note) => (note.id === res.updatedNote.id ? res.updatedNote : note))));
  };

  const deleteNote = (id) => {
    fetch(`${api}/note`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => setNotes(notes.filter((note) => note.id !== id)));
  };

  const searchNotes = (searchKey) => {
	  if(!searchKey) {
		  fetchAll();
		  return;
	  }
    fetch(`${api}/notes/search/${searchKey}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setNotes(res.notes));
  };

  const deleteAllNotes = () => {
    fetch(`${api}/notes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => setNotes([]));
  };

  return (
    <div className={["note-app", `${darkMode ? "dark-mode" : "light-mode"}`].join(" ")}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode} />
        <Search handleSearchNote={searchNotes} />
		<Filters deleteAllNotes={deleteAllNotes}/>
        <NotesList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} handleUpdateNote={updateNote} />
      </div>
    </div>
  );
};

export default App;
