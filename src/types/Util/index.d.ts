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
};