import Content from "../models/Content";

export default () => {
    return Content.bulkCreate([
        { // 1
            publicationID: 1,
            categoryID: 1,
            content: {
                url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            },
        },
        { // 2
            publicationID: 1,
            categoryID: 2,
            content: {
                url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
            },
        },
        { // 3
            publicationID: 1,
            categoryID: 3,
            content: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisl non ipsum tincidunt aliquet. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia.",
            },
        },
        { // 4
            publicationID: 2,
            categoryID: 1,
            content: {
                url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            },
        },
        { // 5
            publicationID: 2,
            categoryID: 2,
            content: {
                url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
            },
        },
        { // 6
            publicationID: 2,
            categoryID: 3,
            content: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisl non ipsum tincidunt aliquet. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia.",
            },
        },
        { // 7
            publicationID: 3,
            categoryID: 1,
            content: {
                url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            },
        },
        { // 8
            publicationID: 3,
            categoryID: 2,
            content: {
                url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
            },
        },
        { // 9
            publicationID: 3,
            categoryID: 3,
            content: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisl non ipsum tincidunt aliquet. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia. Sed auctor, enim sit amet lacinia lacinia, libero nunc ultricies turpis, vel tempor diam diam at odio. In hac habitasse platea dictumst. Donec sed nunc ut sem feugiat lacinia.",
            },
        },
    ]);
};