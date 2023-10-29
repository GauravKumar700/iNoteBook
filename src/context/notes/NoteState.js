import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "653e0fcd01897f3c183ea9d5",
            "user": "653ce9e4be2b0974c0e0dca4",
            "title": "My Title",
            "description": "Please Wake up early",
            "tag": "Personal",
            "date": "2023-10-29T07:54:53.939Z",
            "__v": 0
        },
        {
            "_id": "653e0fe401897f3c183ea9d8",
            "user": "653ce9e4be2b0974c0e0dca4",
            "title": "My Title 2",
            "description": "Please Sleep up early",
            "tag": "Personal",
            "date": "2023-10-29T07:55:16.729Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;