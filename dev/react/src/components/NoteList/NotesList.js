import React from 'react';
import NoteListItem from './NoteListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectNote } from '../../redux/actions';
import Loader from '../Loader';

export default function NotesList({ notes }) {
    const loading = useSelector((state) => state.app.loading);
    const dispatch = useDispatch();

    const removeSelected = () => dispatch(selectNote(null));

    if (!notes.length > 0) {
        return <div>No Notes (use Add button)</div>;
    }

    if (!loading) {
        return <Loader />;
    }

    return (
        <>
            <h3>Notes:</h3>

            <div className="row" onClick={removeSelected}>
                {notes.map((note) => (
                    <div className="col-2" key={note.id}>
                        <NoteListItem note={note} />
                    </div>
                ))}
            </div>

            <div className="row"></div>
        </>
    );
}
