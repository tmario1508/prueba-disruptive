import Category, { CategoryContentType } from "../models/Category";

export default () => {
    return Category.bulkCreate([
        { // 1
            name: "Imágenes",
            description: "Imágenes y fotografías",
            contentType: CategoryContentType.URL,
        },
        { // 2
            name: "Videos",
            description: "Videos, URL y Youtube",
            contentType: CategoryContentType.URL,
        },
        { // 3
            name: "Textos",
            description: "Textos y documentos",
            contentType: CategoryContentType.TEXT,
        },
    ]);
}