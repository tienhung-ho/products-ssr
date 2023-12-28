const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

module.exports.connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("Get data successfully!")
    }
    catch (err) {
        console.log(`Can't get data from database!`)
    }
}
