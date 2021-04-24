// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// const fsPromises = require('fs/promises');
// for note id
var uuid = require('uuid-random');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// keeps css and js in place
app.use('/assets', express.static('assets'));

fs.readFile('db.json', 'utf-8', (err, data) => {

    if (err) throw err;

    const notes = JSON.parse(data);
    console.log(notes)

    // paths
    // direct to notes html
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
    app.get('/api/notes', function (req, res) {
        res.json(notes);
    });

    // post route
    app.post('/api/notes', function (req, res) {
        let newNote = req.body;
        notes.push(newNote);
        addNote();
        console.log('ayyyyyyy');
    });

    // direct to index page for anything else
    app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    // function readJson(callback) {
    //     fs.readFile('db.json', 'utf8', (err, data) => {
    //         if (err) {
    //             callback(err);
    //             return;
    //         }

    //         const rawNotes = JSON.parse(data);
    //         callback(null, rawNotes);
    //     })
    // };

    // add notes to JSON file
    function addNote() {
        fs.writeFile('db.json', JSON.stringify(notes, '/t'), err => {
            if (err) throw err;
        });
    };

    // retrieve notes with specified ID
    app.get('/api/notes/:id', function(req, res) {
        res.json(notes[req.params.id]);
    });

    // readJson((err, data) => {
    //     if (err) {
    //         throw err;
    //     }
    //     data
    // })


    function createItem(value) {
        const id = storage.next++;
        storage.items[id] = value;
        storage.items[id].id = id;
        return id;
    };

    function deleteItem(id) {
        storage.items[id] = undefined;
    };

    // Array.from(Object.values(storage.items));

});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));