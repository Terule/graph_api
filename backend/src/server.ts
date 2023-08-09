import 'dotenv/config';
import app from './app';

const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});

export default server;