import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Category from './Category';
import Topic from './Topic';

@Table
export default class TopicCategories extends Model<TopicCategories> {
    @ForeignKey(() => Topic)
	@Column({allowNull: false})
	topicID!: number;
	@BelongsTo(() => Topic)
	topic?: Topic;

	@ForeignKey(() => Category)
	@Column({ allowNull: false })
	categoryID!: number;
	@BelongsTo(() => Category)
	category?: Category;
}