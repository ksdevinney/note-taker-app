const express = require('express');
const path = require('path');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = {
    next: 0,
};

// paths
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

function createItem(value) {
    const id = storage.next++;
    storage[id] = value;
    return id;
};

function deleteItem(id) {
    storage[id] = undefined;
};

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));