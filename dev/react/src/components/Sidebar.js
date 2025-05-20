import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddForm from './Forms/AddForm';
import EditForm from './Forms/EditForm';
import { useDispatch, useSelector } from 'react-redux';
import {
    switchEditNote,
    switchAddNote,
    deleteNote,
    switchAddDir,
} from '../redux/actions';
import AddDir from './Forms/AddDir';

export default function Sidebar() {
    const editModal = useSelector((state) => state.notes.noteActions.editModal);
    const addNoteModal = useSelector(
        (state) => state.notes.noteActions.addModal
    );
    const addDirModal = useSelector((state) => state.notes.dirActions.addModal);
    const selectedNoteId = useSelector(
        (state) => state.notes.noteActions.selectedNote
    );
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(switchAddNote(false));
        dispatch(switchEditNote(false));
        dispatch(switchAddDir(false));
    };

    // const handleAddNote = () => dispatch(switchAddNote(true));
    // const handleEditNote = () => dispatch(switchEditNote(true));
    // const handleAddDir = () => dispatch(switchAddDir(true));

    const removeNote = (id) => dispatch(deleteNote(id));

    const showHandler = (dispatcher) => dispatch(dispatcher(true));

    return (
        <>
            <h3>Actions:</h3>
            <div className="d-grid gap-2">
                <Button
                    variant="success"
                    onClick={() => showHandler(switchAddNote)}
                >
                    Add Note
                </Button>
                <Button
                    variant="warning"
                    onClick={() => showHandler(switchEditNote)}
                    disabled={!selectedNoteId}
                >
                    Edit Note
                </Button>
                <Button
                    variant="danger"
                    onClick={() => removeNote(selectedNoteId)}
                    disabled={!selectedNoteId}
                >
                    Remove Note
                </Button>
                <Button
                    variant="info"
                    onClick={() => showHandler(switchAddDir)}
                >
                    Add Folder
                </Button>
            </div>

            <Modal
                show={addNoteModal || editModal || addDirModal}
                onHide={handleClose}
            >
                <div className="text-dark">
                    {addNoteModal && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Note</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddForm />
                            </Modal.Body>
                        </>
                    )}

                    {editModal && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Note</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditForm />
                            </Modal.Body>
                        </>
                    )}

                    {addDirModal && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Directory</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddDir />
                            </Modal.Body>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
