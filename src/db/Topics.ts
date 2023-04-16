import Topic from '../models/Topic';

export default () => {
    return Topic.bulkCreate([
        { // 1
            name: 'Ciencias',
            description: 'Ciencias de la naturaleza',
        },
        { // 2
            name: 'Matemáticas',
            description: 'Matemáticas y lógica',
        },
        { // 3
            name: 'Deportes',
            description: 'Deportes y juegos',
        },
    ]);
};