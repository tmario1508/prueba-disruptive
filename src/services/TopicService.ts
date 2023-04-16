import Topic from "../models/Topic";
import TopicCategories from "../models/TopicCategories";

export default class TopicService {
    public async createTopic(payload: CreateOrUpdateTopicRequest): Promise<Topic> {
        // Create topic.
        const topic = await Topic.create({
            name: payload.name,
            description: payload.description,
            image: payload.image,
        });
        // Create topic categories that can be use in this topic.
        for (const category of payload.categories) {
            await TopicCategories.create({
                topicID: topic.id,
                categoryID: category,
            });
        }

        return topic.rest();
    }

    public async updateTopic(id: string, payload: CreateOrUpdateTopicRequest) {
        const topic = await Topic.findByPk(id);
        // Update topic.
        topic!.update({ 
            name: payload.name,
            description: payload.description,
            image: payload.image,
        })
        // Delete all topic categories.
        await TopicCategories.destroy({ where: { topicID: topic!.id } });
        // Create topic categories that can be use in this topic.
        for (const category of payload.categories) {
            await TopicCategories.create({
                topicID: topic!.id,
                categoryID: category,
            });
        }
        
        return topic.rest();
    }

    public async deleteTopic(id: string) {
        const topic = await Topic.findByPk(id);
        // Delete all topic categories.
        await TopicCategories.destroy({ where: { topicID: topic!.id } });
        // Delete topic.
        await topic.destroy();

        return { message: 'Topic deleted' }
    }

    public async getTopic(id: string): Promise<Topic | null> {
        const topic = await Topic.findByPk(id);

        return await topic.rest();
    }

    public async getTopics(): Promise<Topic[] | null> {
        const topics = await Topic.findAll();
        return await Promise.all(topics.map((topic: Topic) => topic.rest()));
    }
}