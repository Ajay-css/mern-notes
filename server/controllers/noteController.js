import Note from "../models/noteModel.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
        console.log(`Fetched ${notes.length} notes successfully.`);
    } catch (error) {
        console.log(`Error fetching notes: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        console.log(`Fetched note with ID: ${id} successfully.`);
        res.status(200).json(note);
    } catch (error) {
        console.log(`Error fetching note by ID: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json(note);
        console.log("Notes Created Successfully")
    } catch (error) {
        console.log(`Error creating note: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(note);
        console.log(`Note with ID: ${id} updated successfully.`);
    } catch (error) {
        console.log(`Error updating note: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
        console.log(`Note with ID: ${id} deleted successfully.`);
    } catch (error) {
        console.log(`Error deleting note: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}