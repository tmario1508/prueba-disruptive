import TopicCategories from "../models/TopicCategories";

export default () => {
    return TopicCategories.bulkCreate([
        { // 1
            topicID: 1,
            categoryID: 1,
        },
        { // 2
            topicID: 1,
            categoryID: 2,
        },
        { // 3
            topicID: 1,
            categoryID: 3,
        },
        { // 4
            topicID: 2,
            categoryID: 1,
        },
        { // 5
            topicID: 2,
            categoryID: 2,
        },
        { // 6
            topicID: 2,
            categoryID: 3,
        },
        { // 7
            topicID: 3,
            categoryID: 1,
        },
        { // 8
            topicID: 3,
            categoryID: 2,
        },
        { // 9
            topicID: 3,
            categoryID: 3,
        },
    ]);
};