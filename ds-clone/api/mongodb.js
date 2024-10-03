const mongoose = require('mongoose');
const process = require('process');
const { MONGO_URI } = process.env;

async function connect() {
    try {
        // const username = MONGO_URI.MONGO_ADMIN_USERNAME || 'dragostinhristov';
        // const password = MONGO_URI.MONGO_ADMIN_PASSWORD || 'qweqweqwe';
        const username = encodeURIComponent('dragostinhristov');
        const password = encodeURIComponent('qweqweqwe');
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