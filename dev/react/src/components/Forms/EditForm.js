import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, switchEditNote, updateNote } from '../../redux/actions';
import Tags from '../Tags';

export default function EditForm() {
    const editNoteId = useSelector(
        (state) => state.notes.noteActions.selectedNote
    );
    const editNote = useSelector((state) =>
        state.notes.notes.find((note) => note.id === editNoteId)
    );
    const folders = useSelector((store) => store.notes.directories);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        title: editNote.title,
        description: editNote.description,
        id: editNote.id,
        directoryId: editNote.directoryId,
        tags: editNote.tags,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        if (!state.title.trim()) {
            dispatch(showAlert('Empty input!!!'));
            return;
        }

        dispatch(
            updateNote({
                title: state.title,
                description: state.description,
                id: state.id,
                directoryId: Number(state.directoryId),
                tags: state.tags,
            })
        );
        setState({
            title: '',
            description: '',
            id: '',
            directoryId: '',
            tags: [],
        });
        dispatch(switchEditNote(false));
    };

    const changeInputHandler = (e) => {
        setState((prev) => ({
            ...prev,
            ...{
                [e.target.name]: e.target.value,
            },
        }));
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    value={state.title}
                    onChange={changeInputHandler}
                    type="text"
                    placeholder="Title"
                    name="title"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={state.description}
                    onChange={changeInputHandler}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Folder</Form.Label>
                <Form.Select
                    name="directoryId"
                    onChange={changeInputHandler}
                    defaultValue={state.directoryId}
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
                <Tags state={state} setState={setState} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

// const mapDispatchToProps = {
//     createNote,
//     switchModalNote,
// };

// export default connect(null, mapDispatchToProps)(AddForm);
