import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Category from './Category';
import Publication from './Publication';

@Table
export default class Content extends Model<Content> {
    @ForeignKey(() => Publication)
	@Column({allowNull: false})
	publicationID!: number;
	@BelongsTo(() => Publication)
	publication?: Publication;

	@ForeignKey(() => Category)
	@Column({ allowNull: false })
	categoryID!: number;
	@BelongsTo(() => Category)
	category?: Category;

    @Column(DataType.JSONB)
	content!: object;
}