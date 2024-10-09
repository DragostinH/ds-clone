const mongoose = require('mongoose');
const process = require('process');
const { MONGO_URL } = process.env;
const username = process.env.MONGO_ADMIN_USERNAME
const password = process.env.MONGO_ADMIN_PASSWORD
async function connect() {
    try {
        mongoose.set('strictQuery', false);
        const mongoDB = `mongodb+srv://${username}:${password}@cluster0.fs8uv.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0`
        // const mongoDB = `mongodb+srv://dragostinhristov:qweqweqwe@cluster0.fs8uv.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0`

        await main();

        async function main() {
            await mongoose.connect(mongoDB);
        }
    } catch (error) {
        console.error('Error connecting to MongoDB');
        console.error(error);
    }

}

module.exports = { connect };