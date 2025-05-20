import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Alert() {
    const text = useSelector((state) => state.app.alert);

    if (!text) {
        return;
    }
    return (
        <ToastContainer position="top-end">
            <Toast bg="danger">
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Alert!</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
