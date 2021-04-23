const express = require('express');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('assets'));

const storage = {
    next: 0,
    items: {
        5: {
            id: 5,
            title: "my cool note",
            text: " my cool note contents",
        }
    },
};

// paths
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => {
    readJson((err, data) => {
        if (err) {
            throw err;
        }
        const returnedNotes = Object.values(data.items);
        res.json(returnedNotes);
    })
})
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

function readJson(callback) {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        const rawNotes = JSON.parse(data);
        callback(null, rawNotes);
    })
}

// readJson((err, data) => {
//     if (err) {
//         throw err;
//     }
//     data
// })

// readJsonPromise.then((data) => {
//     dat
// }).catch((err) => {

// })

async function readJsonPromise() {
    const data = await fsPromises.readFile('db.json', 'utf8');
    return JSON.parse(data);
}

function createItem(value) {
    const id = storage.next++;
    storage.items[id] = value;
    storage.items[id].id = id;
    return id;
};

function deleteItem(id) {
    storage.items[id] = undefined;
};

Array.from(Object.values(storage.items));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));