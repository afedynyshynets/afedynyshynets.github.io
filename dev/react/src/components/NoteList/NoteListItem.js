import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNote } from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function NoteListItem({ note }) {
    const dispatch = useDispatch();
    const selectedNoteState = useSelector(
        (state) => state.notes.noteActions.selectedNote
    );
    const selectedCurrent = note.id === selectedNoteState;

    const selectNoteHandler = (e) => {
        e.stopPropagation();
        selectedNoteState === note.id
            ? dispatch(selectNote(null))
            : dispatch(selectNote(note.id));
    };

    return (
        <div
            className={`card mb-3 ${
                selectedCurrent ? 'text-bg-info' : 'text-bg-light'
            }`}
            id={note.position}
            onClick={selectNoteHandler}
        >
            <div className="card-header">
                <Link className="link-secondary" to={`/edit/${note.id}`}>
                    {note.title}
                </Link>
            </div>
            <div className="card-body">
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    );
}
