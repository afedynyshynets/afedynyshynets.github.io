import React, { useState } from 'react';
// import Autocomplete from 'react-autocomplete';
import { Badge, Button, InputGroup, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Tags({ state, setState }) {
    const [stateTag, setStateTag] = useState('');
    const allTags = useSelector((store) => store.notes.notes.map((note) => (note.tags.length ? note.tags : '')))
        .join(',')
        .split(',')
        .filter((i) => i !== '');

    const addTag = (newTag) => {
        setState({ ...state, tags: [...state.tags, newTag] });
        setStateTag('');
    };

    return (
        <>
            <Stack
                direction="horizontal"
                gap={2}
                className="mb-2">
                {state.tags.map((tag) => (
                    <Badge
                        bg="primary"
                        key={tag}>
                        {tag}
                    </Badge>
                ))}
            </Stack>
            <InputGroup className="tagsWr">
                {/* <Autocomplete
                    getItemValue={(item) => item}
                    items={allTags.filter((tag) => !state.tags.includes(tag))}
                    shouldItemRender={(item, value) =>
                        item.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    renderItem={(item) => <div key={item}>{item}</div>}
                    value={stateTag}
                    onSelect={(item) => setStateTag(item)}
                    onChange={(e) => setStateTag(e.target.value)}
                    className="form-control"
                /> */}

                <Button
                    variant="success"
                    onClick={() => addTag(stateTag)}>
                    Add
                </Button>
            </InputGroup>
        </>
    );
}
