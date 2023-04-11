let mongoose = require('mongoose')

// use mongoose to initialize schema
let mongoSchema = mongoose.Schema

// use mongoSchema to create reference to the tweet collection
let tweet = new mongoSchema({
    "message": String,
    "author": String,
    "likes": Number,
    "dislikes": Number,
    "videoid": String
}, {
    collection:"tweet"
})

// export the model
module.exports = mongoose.model("tweetmodel", tweet)