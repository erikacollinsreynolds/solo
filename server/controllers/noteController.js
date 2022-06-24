const Note = require('../models/noteModel');

const noteController = {};

noteController.getNotes = (req, res, next) => {
    Note.find({}, (err, notes) => {
        if (err) return next('Error in noteController.getNotes: ' + JSON.stringify(err));
        res.locals.notes = notes;
        console.log('RES.LOCALS.NOTES -->', res.locals.notes)
        return next();
    })
}

noteController.displayNotes = (req, res, next) => {
    
}

noteController.createNote = (req, res, next) => {
    console.log('NEW NOTE -->', req.body);
    const {studentName, subject, note} = req.body;
    const newNote = new Note ({studentName, subject, note});
        if (!newNote.studentName || !newNote.subject || !newNote.note) {
        return res.status(500).send('Error in noteController.createNote: Incorrect data received.');
        }
        newNote.save();
        return next();
}

//Can I add a controller to query my db and then use those results in index.js?


module.exports = noteController;