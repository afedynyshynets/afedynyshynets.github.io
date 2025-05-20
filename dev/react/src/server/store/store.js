var idGenerator = require('./id-generator');

var store = {
    directories: [
        {
            id: 0,
            name: 'default',
            parentId: 0,
        },
        {
            id: idGenerator.getNext(),
            name: 'folder1',
            parentId: 0,
        },
        {
            id: idGenerator.getNext(),
            name: 'folder2',
            parentId: 1,
        },
        {
            id: idGenerator.getNext(),
            name: 'folder3',
            parentId: 1,
        },
    ],
    notices: [
        {
            id: idGenerator.getNext(),
            directoryId: 1,
            position: 0,
            title: 'Note 1',
            description: 'description 1',
            tags: ['newTag1', 'newTag2'],
        },
        {
            id: idGenerator.getNext(),
            directoryId: 1,
            position: 0,
            title: 'Note 2',
            description: 'description 2',
            tags: [],
        },
        {
            id: idGenerator.getNext(),
            directoryId: 2,
            position: 0,
            title: 'Note 3',
            description: 'description 3',
            tags: [],
        },
        {
            id: idGenerator.getNext(),
            directoryId: 3,
            position: 0,
            title: 'Note 4',
            description: 'description 4',
            tags: [],
        },
    ],
};

module.exports = store;
