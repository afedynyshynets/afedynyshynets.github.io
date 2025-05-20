import {
    CREATE_NOTE,
    FETCH_DIR,
    FETCH_NOTES,
    SELECT_NOTE,
    SWITCH_EDIT_NOTE,
    SWITCH_ADD_NOTE,
    UPDATE_NOTE,
    SELECT_DIR,
    SWITCH_ADD_DIR,
} from './types';

const initiatlState = {
    notes: [],
    directories: [],
    noteActions: {
        addModal: false,
        editModal: false,
        selectedNote: undefined,
        selectedDirectory: undefined,
    },
    dirActions: {
        addModal: false,
    },
};

export const notesReducer = (state = initiatlState, action) => {
    switch (action.type) {
        // case CREATE_NOTE:
        //     return { ...state, notes: [...state.notes, action.payload] };
        // case UPDATE_NOTE:
        //     return {
        //         ...state,
        //         notes: state.notes.map((note) =>
        //             note.id === action.payload.id
        //                 ? {
        //                       title: action.payload.title,
        //                       text: action.payload.text,
        //                       id: note.id,
        //                   }
        //                 : note
        //         ),
        //     };
        case SWITCH_ADD_NOTE:
            return {
                ...state,
                noteActions: { ...state.noteActions, addModal: action.payload },
            };
        case SWITCH_EDIT_NOTE:
            return {
                ...state,
                noteActions: {
                    ...state.noteActions,
                    editModal: action.payload,
                },
            };
        case SWITCH_ADD_DIR:
            return {
                ...state,
                dirActions: {
                    ...state.dirActions,
                    addModal: action.payload,
                },
            };
        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload,
                // fetchedNotes: action.payload,
            };
        case FETCH_DIR:
            return {
                ...state,
                directories: action.payload,
                // fetchedNotes: action.payload,
            };
        case SELECT_NOTE:
            return {
                ...state,
                noteActions: {
                    ...state.noteActions,
                    selectedNote: action.payload,
                },
            };
        case SELECT_DIR:
            return {
                ...state,
                noteActions: {
                    ...state.noteActions,
                    selectedDirectory: action.payload,
                },
            };
        default:
            return state;
    }
};
