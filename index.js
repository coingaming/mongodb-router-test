const MongoClient = require('mongodb').MongoClient;

const requiredVariables = ['MONGO_URL', 'MONGO_DB', 'MONGO_COLLECTION', 'MONGO_QUERY_ID'];
requiredVariables.forEach(x => {
    if(!process.env[x]) {
        console.error(`MISSING ${x}`);
        process.exit(1);
    }
});

const { MONGO_URL, MONGO_DB, MONGO_COLLECTION, MONGO_QUERY_ID } = process.env;


const start = async () => {
    const url = MONGO_URL;

// Use connect method to connect to the server
    let client;
    try {
        client = await MongoClient.connect(url);
    } catch (e) {
        console.error('Connection error', e);
        process.exit(1);
    }
    const db = await client.db(MONGO_DB);
    const start = new Date();
    const result = await db.collection(MONGO_COLLECTION).findOne({_id: MONGO_QUERY_ID });

    console.log('Result', result);
    console.log('Timing', new Date() - start);
};


start().then(console.log).catch(console.error);

// Connection URL
