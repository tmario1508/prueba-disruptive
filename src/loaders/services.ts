import UserService from "../services/UserService";
import Encryption from "../services/Encryption";
import TopicService from "../services/TopicService";
import CategoryService from "../services/CategoryService";
import PublicationService from "../services/PublicationService";

export const userService = new UserService();
export const encryption = new Encryption();
export const topicService = new TopicService();
export const categoryService = new CategoryService();
export const publicationService = new PublicationService();
