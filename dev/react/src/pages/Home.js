import React from 'react';
import Sidebar from '../components/Sidebar';
import Folders from '../components/Folders';
import { useSelector } from 'react-redux';
import NotesList from '../components/NoteList/NotesList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
    const notes = useSelector((store) => store.notes.notes);
    const selectedDirectory = useSelector(
        (store) => store.notes.noteActions.selectedDirectory
    );
    const selectedNotesDirectories = useSelector(
        (store) => store.notes.directories
    )
        .filter((note) => note.parentId === selectedDirectory)
        .map((dir) => dir.id);

    const filtredNotes = [
        ...notes.filter((note) => note.directoryId === selectedDirectory),
    ];

    notes.forEach((note) => {
        selectedNotesDirectories.forEach((i) => {
            if (note.directoryId === i) {
                filtredNotes.push(note);
            }
        });
    });

    return (
        <div className="row">
            <div className="col-auto">
                <Sidebar />
            </div>
            <div className="col">
                <div className="row">
                    <div className="col-2">
                        <Folders />
                    </div>
                    <div className="col-10">
                        <DndProvider backend={HTML5Backend}>
                            {selectedDirectory ? (
                                <NotesList notes={filtredNotes} />
                            ) : (
                                <NotesList notes={notes} />
                            )}
                        </DndProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
