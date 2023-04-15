import UserService from "../services/UserService";
import Encryption from "../services/Encryption";
import TopicService from "../services/TopicService";

export const userService = new UserService();
export const encryption = new Encryption();
export const topicService = new TopicService();
