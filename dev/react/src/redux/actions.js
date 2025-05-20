import {
    FETCH_DIR,
    FETCH_NOTES,
    HIDE_ALERT,
    HIDE_LOADER,
    SELECT_NOTE,
    SHOW_ALERT,
    SHOW_LOADER,
    SWITCH_EDIT_NOTE,
    SWITCH_ADD_NOTE,
    SELECT_DIR,
    SWITCH_ADD_DIR,
} from './types';

export function fetchNotes() {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            const response = await fetch('http://localhost:3001/notices');
            const json = await response.json();
            dispatch({
                type: FETCH_NOTES,
                payload: json,
            });
            dispatch(fetchDir());
            // setTimeout(() => {
            dispatch(hideLoader());
            // }, 1000);
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}
export function createNote({ title, description, directoryId, tags }) {
    return async (dispatch) => {
        try {
            await fetch('http://localhost:3001/notices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    directoryId,
                    position: 0,
                    title,
                    description,
                    tags,
                }),
            });
            dispatch(fetchNotes());
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}
export function updateNote({ title, description, id, directoryId, tags }) {
    return async (dispatch) => {
        try {
            await fetch(`http://localhost:3001/notices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    directoryId,
                    position: 0,
                    title,
                    description,
                    tags,
                }),
            });
            dispatch(fetchNotes());
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}
export function deleteNote(id) {
    return async (dispatch) => {
        try {
            await fetch(`http://localhost:3001/notices/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(fetchNotes());
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}

export function fetchDir() {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/directories');
            const json = await response.json();
            dispatch({
                type: FETCH_DIR,
                payload: json,
            });
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}
export function createDir({ name, parentId }) {
    return async (dispatch) => {
        try {
            await fetch('http://localhost:3001/directories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    parentId,
                }),
            });
            dispatch(fetchDir());
        } catch (error) {
            dispatch(showAlert(error.toString()));
        }
    };
}

export function switchAddNote(modal) {
    return {
        type: SWITCH_ADD_NOTE,
        payload: modal,
    };
}
export function switchEditNote(modal) {
    return {
        type: SWITCH_EDIT_NOTE,
        payload: modal,
    };
}
export function switchAddDir(modal) {
    return {
        type: SWITCH_ADD_DIR,
        payload: modal,
    };
}
export function selectNote(id) {
    return {
        type: SELECT_NOTE,
        payload: id,
    };
}
export function selectDir(id) {
    return {
        type: SELECT_DIR,
        payload: id,
    };
}
export function showLoader() {
    return {
        type: SHOW_LOADER,
    };
}
export function hideLoader() {
    return {
        type: HIDE_LOADER,
    };
}
export function showAlert(text) {
    return (dispatch) => {
        dispatch({
            type: SHOW_ALERT,
            payload: text,
        });
        setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
    };
}
export function hideAlert() {
    return {
        type: HIDE_ALERT,
    };
}
