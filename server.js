// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const util = require('util');
// for note id
var uuid = require('uuid-random');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// keeps css and js in place
app.use('/assets', express.static('assets'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

fs.readFile('db.json', 'utf-8', (err, data) => {

    if (err) throw err;

    let notes = JSON.parse(data);
    console.log(notes)

    // paths
    // direct to notes.html
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
    app.get('/api/notes', async function (req, res) {
        res.json(notes);
    });

    //post route
    app.post('/api/notes', async function (req, res) {
        let newNote = req.body;
        // add a unique id to the new note
        newNote.id = uuid();
        // get current list of notes, add to db file
        notes.push(newNote);
        // respond with notes array
        res.json(notes);
        await fsPromises.writeFile('db.json', JSON.stringify(notes, null, 2));
    })

    app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    // async because it needs to wait for notes file to be read
    async function readJson() {
        let foundNotes = await readFileAsync('db.json', 'utf8');
        let parsedNotes;
        // if notes aren't in an array etc
        try {
            parsedNotes = [].concat(JSON.parse(foundNotes));
        } catch (err) {
            parsedNotes = [];
        }
        // return the value
        return parsedNotes;
    };


});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));