import Publication from "../models/Publication";

export default () => {
    return Publication.bulkCreate([
        { // 1
            title: "Título 1",
            description: "Descripción 1",
            userID: 1,
            topicID: 1,
        },
        { // 2
            title: "Título 2",
            description: "Descripción 2",
            userID: 2,
            topicID: 2,
        },
        { // 3
            title: "Título 3",
            description: "Descripción 3",
            userID: 3,
            topicID: 3,
        },
    ]);
}