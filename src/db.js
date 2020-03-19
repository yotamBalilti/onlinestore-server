const mongoose = require('mongoose');
const config = require('./config/environment/index');

mongoose.connect(`mongodb://${config.db.address}/${config.db.name}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB');
})