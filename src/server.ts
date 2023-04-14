import { PORT } from './config';
import { preload } from './loaders/preload';
import app from './app';

preload().then(async _ => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});