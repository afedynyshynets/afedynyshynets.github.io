import { showAlert } from './actions';
import { CREATE_NOTE } from './types';

const forbidden = ['fuck', 'spam', 'php'];

export function forbiddenWordsMiddleware({ dispatch }) {
    return function (next) {
        return function (action) {
            if (action.type === CREATE_NOTE) {
                const found = forbidden.filter((w) =>
                    action.payload.title.includes(w)
                );
                if (found.length) {
                    return dispatch(showAlert('Used forbidden words!!!'));
                }
            }
            return next(action);
        };
    };
}
