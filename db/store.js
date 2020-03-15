var util = require("util");
var fs = require("fs");
const uuidv1 = require("uuid/v1");
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

class Store{
    read(){
        return readFileAsync("db/db.json","utf8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    get(){
        return this.read().then(notes => {
            var parseNotes;

            try{
                parseNotes= [].concat(JSON.parse(notes))
            }
            catch(err){
                parseNotes = []
            }
            return parseNotes
        })
    }
    add(note){
        const {title, text}=note

        if (!title || !text){
            throw new Error("Please enter a title and a note")
        }
        const newNote = {title, text, id: uuidv1()}
        return this.get().then(notes => [...notes,newNote]).then(updatedNotes => this.write(updatedNotes)).then(()=>newNote)
    }
    remove(id){
        return this.getNotes().then(notes => notes.filter(note => note.id !== id)).then(filteredNotes => this.write (filteredNotes))
    }
}

module.exports = new Store()