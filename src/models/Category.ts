import { Column, Model, Table } from 'sequelize-typescript';

export enum CategoryContentType {
    TEXT = 'text',
    URL = 'url',
    FILE = 'file',
}


@Table
export default class Category extends Model<Category> {
    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    image!: string;

    @Column
    contentType!: CategoryContentType;

    rest() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            content_type: this.contentType,
        };
    }
}