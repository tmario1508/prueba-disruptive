import Publication from "../models/Publication";
import User from "../models/User";
import Content from "../models/Content";
import util from "../loaders/util";
import { Op } from "sequelize";
import Topic from "../models/Topic";

export default class PublicationService {
    public async createPublication(endUser: User, payload: CreateOrUpdatePublicationRequest): Promise<Publication> {
        // Create publication.
        const publication = await Publication.create({
            title: payload.title,
            description: payload.description,
            userID: endUser.id,
            topicID: payload.topic_id,
        });
        // Create contents for this publication.
        for (const content of payload.contents) {
            await Content.create({
                content: content.content,
                categoryID: content.category_id,
                publicationID: publication.id,
            });
        }

        return publication.rest();
    }

    public async updatePublication(id: string, payload: CreateOrUpdatePublicationRequest) {
        const publication = await Publication.findByPk(id);
        // Update publication.
        publication!.update({ 
            title: payload.title,
            description: payload.description,
            topicID: payload.topic_id,
        })
        // Delete all contents.
        await Content.destroy({ where: { publicationID: publication!.id } });
        // Create contents for this publication.
        for (const content of payload.contents) {
            await Content.create({
                content: content.content,
                categoryID: content.category_id,
                publicationID: publication!.id,
            });
        }

        return publication.rest();
    }

    public async deletePublication(id: string) {
        const publication = await Publication.findByPk(id);
        // Delete all contents.
        await Content.destroy({ where: { publicationID: publication!.id } });
        // Delete publication.
        await publication.destroy();

        return { message: 'Publication deleted' }
    }

    public async getPublication(id: string, endUser?: User): Promise<Publication | null> {
        const publication = await Publication.findByPk(id);
        if (!endUser) {
            return await publication.invitedRest();
        } else {
            return await publication.rest();
        }
    }

    public async getPublications(filters: FiltersPublications, endUser?: User) {
        let options: any = {};
        let order: any = [['createdAt', 'desc']];
        // Sort by title or topic.
        if (filters.sortOrder && filters.sortBy) {
			let map: Record<string, any> = {
				title: [['title', filters.sortOrder]],
				topic: [['topic', 'name', filters.sortOrder]],
			}
			order = map[filters.sortBy];
		}
        // Search by query.
        if (filters.query) {
            const iLikeClause = { [Op.iLike]: util.escapeStr(filters.query) };
            options = { 
                ...options,
                [Op.and]: {
                    [Op.or]: [
                        { ['$topic.name$']: iLikeClause },
						{ title: iLikeClause },
                        { description: iLikeClause },
                    ]
                }
            };
        }
        // Get publications.
        const { rows, count } = await Publication.findAndCountAll({
            offset: (filters.page ? filters.page - 1 : 0) * filters.limit,
            where: options,
            order,
            limit: filters.limit ? filters.limit : 100,
            include: [Topic],
        });

        if (!endUser) {
            return {
                data: await Promise.all(rows.map(async (publication: Publication) => publication.invitedRest())),
                total: count,
            };
        } else {
            return {
                data: await Promise.all(rows.map(async (publication: Publication) => publication.rest())),
                total: count,
            };
        }
    }
}