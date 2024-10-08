import mongoose from 'mongoose';

export default async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}