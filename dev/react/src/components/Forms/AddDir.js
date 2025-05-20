import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createDir, showAlert, switchAddDir } from '../../redux/actions';

export default function AddDir() {
    const [state, setState] = useState({ name: '', parentId: 0 });
    const folders = useSelector((store) => store.notes.directories);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!state.name.trim()) {
            dispatch(showAlert('Empty input!!!'));
            return;
        }

        const newDir = {
            name: state.name,
            parentId: Number(state.parentId),
        };

        setState(() => newDir);
        dispatch(createDir(newDir));
        setState({ name: '', parentId: '' });
        dispatch(switchAddDir(false));
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                    value={state.name}
                    onChange={changeInputHandler}
                    type="text"
                    placeholder="Name"
                    name="name"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Folder</Form.Label>
                <Form.Select name="parentId" onChange={changeInputHandler}>
                    {folders
                        .filter((dir) => dir.parentId === 0)
                        .map((dir) => (
                            <option value={dir.id} key={dir.id}>
                                {dir.name}
                            </option>
                        ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
