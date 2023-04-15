import Topic from "../models/Topic";

export default class TopicService {
    public async createTopic(payload: CreateOrUpdateTopicRequest): Promise<Topic> {
        const topic = await Topic.create({
            name: payload.name,
            description: payload.description,
            image: payload.image,
        });
        return topic.rest();
    }

    public async updateTopic(id: string, payload: CreateOrUpdateTopicRequest) {
        const topic = await Topic.findByPk(id);
        topic!.update({ 
            name: payload.name,
            description: payload.description,
            image: payload.image,
        })
        
        return topic.rest();
    }

    public async deleteTopic(id: string) {
        const topic = await Topic.findByPk(id);
        await topic.destroy();

        return { message: 'Topic deleted' }
    }

    public async getTopic(id: string): Promise<Topic | null> {
        const topic = await Topic.findByPk(id);

        return topic.rest();
    }

    public async getTopics(): Promise<Topic[]> {
        const topics = await Topic.findAll();
        return topics.map((topic: Topic) => topic.rest());
    }
}