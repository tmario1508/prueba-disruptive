type CreateUserRequest = {
    name: string;
    user_name: string;
    email: string;
    password: string;
    role: string;
};

type UpdateUserRequest = {
    name: string;
    password?: string;
    role: string;
}

type DisruptiveJWT = {
    endUserID: number;
};

type LoginUserRequest = {
    user: string;
    password: string;
    isEmail?: boolean;
};

type CreateOrUpdateTopicRequest = {
    name: string;
    description: string;
    image: string;
    categories: number[];
};

type CreateOrUpdateCategoryRequest = {
    name: string;
    description: string;
    image: string;
};

type CreateOrUpdatePublicationRequest = {
    title: string;
    description: string;
    topic_id: number;
    contents: Array<{
        category_id: number;
        content: Record<string, string>;
    }>;
};

type FiltersPublications = {
    page?: number;
    limit: number;
    sortBy?: string;
    sortOrder?: string;
    query?: string;
}