import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';

import Home from './pages/Home';
import Note from './pages/Note';
import Navigation from './components/Navigation';
import Alert from './components/Alert';
import { fetchNotes } from './redux/actions';
import { thunk } from 'redux-thunk';

function App() {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

    store.dispatch(fetchNotes());

    return (
        <Provider store={store}>
            <Navigation />
            <Alert />
            <div className="container-fluid pt-3">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<Note />}
                    />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
