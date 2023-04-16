import { Column, Model, Table } from 'sequelize-typescript';
import TopicCategories from './TopicCategories';
import Category from './Category';

@Table
export default class Topic extends Model<Topic> {
    @Column
    name!: string;

    @Column
    description!: string;

    async rest() {
        const categories = await TopicCategories.findAll({
            where: { topicID: this.id },
            include: [Category]
        });

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            categories: await Promise.all(categories.map((category: TopicCategories) => category.category!.rest()))
        };
    }
}