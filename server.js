const storage = {
    next: 0,
};


function createItem(value) {
    const id = storage.next++;
    storage[id] = value;
    return id;
}

function deleteItem(id) {
    storage[id] = undefined;
}