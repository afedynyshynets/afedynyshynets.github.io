import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showAlert, updateNote } from '../redux/actions';
import Tags from '../components/Tags';

export default function Note() {
    const noteId = useParams();
    const dispatch = useDispatch();
    const note = useSelector((store) =>
        store.notes.notes.find((note) => note.id === Number(noteId.id))
    );
    const [editedNote, setEditedNote] = useState({
        title: '',
        description: '',
        id: null,
        directoryId: '',
        tags: [],
    });
    const folders = useSelector((store) => store.notes.directories);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!editedNote.title.trim()) {
            dispatch(showAlert('Empty input!!!'));
            return;
        }

        dispatch(updateNote(editedNote));
        dispatch(showAlert('UPDATED!!!'));
    };

    const changeValueHandler = (e) => {
        setEditedNote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        setEditedNote({ ...note });
    }, [note]);

    return (
        <div className="container">
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={editedNote.title || ''}
                        onChange={changeValueHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Text:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        value={editedNote.description || ''}
                        onChange={changeValueHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Folder</Form.Label>
                    <Form.Select
                        name="directoryId"
                        onChange={changeValueHandler}
                        defaultValue={editedNote.directoryId}
                    >
                        {folders
                            .filter((dir) => dir.id !== 0)
                            .map((dir) => (
                                <option value={dir.id} key={dir.id}>
                                    {dir.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags:</Form.Label>
                    <Tags state={editedNote} setState={setEditedNote} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
