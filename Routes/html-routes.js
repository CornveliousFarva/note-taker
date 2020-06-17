var path = require("path");
var router = require("express").Router();

// "/notes" responds with the notes.html file
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
