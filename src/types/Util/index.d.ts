type CreateUserRequest = {
    name: string;
    user_name: string;
    email: string;
    password: string;
    role: string;
};

type DisruptiveJWT = {
    endUserID: number;
};

type LoginUserRequest = {
    email: string;
    password: string;
};