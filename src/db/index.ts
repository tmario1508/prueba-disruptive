import User from './User';
import Topics from './Topics';

export default async () => {
    await User();
    await Topics();
};