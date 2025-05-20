import React, { useState } from 'react';
// import Autocomplete from 'react-autocomplete';
import { Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navigation() {
    let [search, setSearch] = useState('');
    const notes = useSelector((state) => state.notes.notes);

    return (
        <nav className="navbar bg-black">
            <div className="container-fluid">
                <div className="row w-100 align-items-center">
                    <div className="col-4">
                        <Link
                            className="navbar-brand text-light"
                            to="/">
                            Notes Manager
                        </Link>
                    </div>
                    <div className="col-4">
                        {/* <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-light">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/edit"
                                    className="nav-link text-light"
                                >
                                    Edit
                                </Link>
                            </li>
                        </ul> */}
                    </div>
                    <div className="col-4">
                        <InputGroup className="searchWr">
                            {/* <Autocomplete
                                getItemValue={(item) =>
                                    item.title || item.description
                                }
                                items={notes}
                                shouldItemRender={(item, value) =>
                                    item.title
                                        .toLowerCase()
                                        .indexOf(value.toLowerCase()) > -1 ||
                                    item.description
                                        .toLowerCase()
                                        .indexOf(value.toLowerCase()) > -1
                                }
                                renderItem={(item, isHighlighted) => (
                                    <div
                                        className="card list-group-item list-group-item-action list-group-item-secondary"
                                        key={item.id}
                                    >
                                        <Link
                                            className="link-secondary"
                                            to={'/edit/' + item.id}
                                        >
                                            <div className="p-2">
                                                <h5 className="card-title">
                                                    {item.title}
                                                </h5>
                                                <p className="card-text">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            /> */}
                            <Button variant="success">Search</Button>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </nav>
    );
}
