const Note = require('../models/noteModel');

const noteController = {};

noteController.getNotes = (req, res, next) => {
    Note.find({}, (err, notes) => {
        if (err) return next('Error in noteController.getNotes: ' + JSON.stringify(err));
        // store retrieved users into res.locals and move on to next middleware
        res.locals.notes = notes;
        console.log('RES.LOCALS.NOTES -->', res.locals.notes)
        return next();
    })
}

noteController.createNote = (req, res, next) => {
    console.log('NEW NOTE -->', req.body);
    const newNote = new Note ({
        studentName: req.body.studentName,
        subject: req.body.subject,
        note: req.body.note
        });

        if (!newNote.studentName || !newNote.subject || !newNote.note) {
        return res.status(500).send('Error in noteController.createNote: Incorrect data received.');
        }
        newNote.save();
        return next();
}

noteController.deleteNote = (req, res, next) => {

}

module.exports = noteController;