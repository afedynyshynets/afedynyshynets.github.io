import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDir } from '../redux/actions';
import { ListGroup } from 'react-bootstrap';

export default memo(function Folders() {
    const folders = useSelector((store) => store.notes.directories);
    const dispatch = useDispatch();
    const filteredFolder = [...folders].filter((dir) => dir.id !== 0);

    const selectDirectory = (dir) => dispatch(selectDir(dir));

    return (
        <>
            <h3>Folders:</h3>
            <ListGroup>
                <ListGroup.Item
                    onClick={() => selectDirectory(undefined)}
                    variant="info"
                    action
                >
                    All Notes
                </ListGroup.Item>
                {filteredFolder.map((folder) => (
                    <ListGroup.Item
                        key={`${folder.id}${folder.name}`}
                        className="p-0"
                    >
                        <ListGroup.Item
                            onClick={() => selectDirectory(folder.id)}
                            variant="info"
                            action
                        >
                            {folder.name}
                        </ListGroup.Item>
                        {folders
                            .filter((dir) => dir.parentId === folder.id)
                            .map((folderInside) => {
                                filteredFolder.splice(
                                    filteredFolder.indexOf(folderInside),
                                    1
                                );
                                return (
                                    <ListGroup.Item
                                        className="ps-5"
                                        key={`${folderInside.id}${folderInside.name}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            selectDirectory(folderInside.id);
                                        }}
                                        variant="info"
                                        action
                                    >
                                        {folderInside.name}
                                    </ListGroup.Item>
                                );
                            })}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
});
