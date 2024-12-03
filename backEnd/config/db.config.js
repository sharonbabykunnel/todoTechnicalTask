import mongoose from 'mongoose';

const connectWithRetry = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        await mongoose.connect(dbUrl);
        console.log(`DataBase connedted..`)
    } catch (error) {
        setTimeout(connectWithRetry(), 5000);
        console.log(`Error connecting to Mongodb ${error}`)
    }
}

export default connectWithRetry;