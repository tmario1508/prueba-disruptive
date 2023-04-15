import Topic from '../models/Topic';

export default () => {
    return Topic.bulkCreate([
        {
            name: 'Ciencias',
            description: 'Ciencias de la naturaleza',
            image: 'https://www.abc.es/Media/201801/12/ciencias-650x366.jpg',
        },
        {
            name: 'Matemáticas',
            description: 'Matemáticas y lógica',
            image: 'https://www.abc.es/Media/201801/12/ciencias-650x366.jpg',
        },
        {
            name: 'Deportes',
            description: 'Deportes y juegos',
            image: 'https://www.abc.es/Media/201801/12/ciencias-650x366.jpg',
        },
    ]);
};