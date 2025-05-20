import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, showAlert, switchAddNote } from '../../redux/actions';
import Tags from '../Tags';

export default function AddForm() {
    const [state, setState] = useState({
        title: '',
        text: '',
        directoryId: '',
        tags: [],
    });
    const folders = useSelector((store) => store.notes.directories);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!state.title.trim()) {
            dispatch(showAlert('Empty input!!!'));
            return;
        }

        const newNote = {
            title: state.title,
            description: state.description,
            directoryId: Number(state.directoryId),
            tags: state.tags,
        };

        setState(() => newNote);
        dispatch(createNote(newNote));
        setState({ title: '', description: '', directoryId: '' });
        dispatch(switchAddNote(false));
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
                <Form.Select name="directoryId" onChange={changeInputHandler}>
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
