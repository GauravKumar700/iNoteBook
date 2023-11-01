import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all Notes
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2U5ZTRiZTJiMDk3NGMwZTBkY2E0In0sImlhdCI6MTY5ODQ5MTA0M30.wOyEXAVMeQIYvACI8WZUlO0k9qOmWvvDwEHhvcyOw8o"
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2U5ZTRiZTJiMDk3NGMwZTBkY2E0In0sImlhdCI6MTY5ODQ5MTA0M30.wOyEXAVMeQIYvACI8WZUlO0k9qOmWvvDwEHhvcyOw8o"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async(id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2U5ZTRiZTJiMDk3NGMwZTBkY2E0In0sImlhdCI6MTY5ODQ5MTA0M30.wOyEXAVMeQIYvACI8WZUlO0k9qOmWvvDwEHhvcyOw8o"
            }
        });

        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2U5ZTRiZTJiMDk3NGMwZTBkY2E0In0sImlhdCI6MTY5ODQ5MTA0M30.wOyEXAVMeQIYvACI8WZUlO0k9qOmWvvDwEHhvcyOw8o"
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json()

        let newNote = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break
            }
        }
        setNotes(newNote)
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;