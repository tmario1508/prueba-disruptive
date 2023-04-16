import User from './User';
import Topics from './Topics';
import Categories from './Categories';
import TopicCategories from './TopicCategories';
import Publications from './Publications';
import Contents from './Contents';

export default async () => {
    await User();
    await Topics();
    await Categories();
    await TopicCategories();
    await Publications();
    await Contents();
};