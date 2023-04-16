import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Topic from './Topic';
import User from './User';
import Content from './Content';
import Category from './Category';

@Table
export default class Publication extends Model<Publication> {
    @Column
    title!: string;

    @Column
    description!: string;

    @ForeignKey(() => Topic)
	@Column({allowNull: false})
	topicID!: number;
	@BelongsTo(() => Topic)
	topic?: Topic;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    userID!: number;
    @BelongsTo(() => User)
    user?: User;

    async rest() {
        const topic = await this.$get('topic');
        const user = await this.$get('user');
        const contents = await Content.findAll({
            where: { publicationID: this.id },
            include: [Category],
        });

        return {
            id: this.id,
            title: this.title,
            description: this.description,
            topic: topic.name,
            credits: user.userName,
            contents: contents.map((content: Content) => {
                return {
                    category: content.category!.name,
                    content: content.content,
                };
            }),
        };
    }

    async invitedRest() {
        const topic = await this.$get('topic');
        const user = await this.$get('user');
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            topic: topic.name,
            credits: user.userName,
        };
    }
}