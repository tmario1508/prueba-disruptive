import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class Topic extends Model<Topic> {
    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    image!: string;

    rest() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            image: this.image,
        };
    }
}