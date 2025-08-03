const mongoose = require('mongoose');

async function connectToMongoDb(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDb,
};

// const mongoose= require('mongoose');
// mongoose.connect("mongodb://localhost:27017/e-commerce")


// mongoose.connect('mongodb://localhost:27017/e-commerce')
// .then(() => console.log("Mongodb Connected"));