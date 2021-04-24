//Dependancies
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;

//routes
// saves notes to db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//posting
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(".db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
})

//deleting
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNotes = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNotes));
    res.json(deleteNotes);
})

//Listener
app.listen(PORT, function () {
    console.log("App listening to PORT: " + PORT);
});
