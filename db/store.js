const util = require("util");
const fs = require("fs");

// This package will be used to generate our unique ids.
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(){
        return readFileAsync("db/db.json", "utf8");
    }

    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
              } catch (err) {
                parsedNotes = [];
              }
        
              return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
    
        if (!title || !text) {
          throw new Error("Note 'title' and 'text' cannot be blank");
        }
    
}