let express = require('express')
let mongoose = require('mongoose')
let tweet = require('./tweet')
let cors = require('cors')

// create express app
let app = express()

// configure cors
app.use(cors())

// configure express to use request & response in json format
app.use(express.json())

// define connection string
let conString = "mongodb+srv://mongouser:mongopassword@cluster0.ylwkx7e.mongodb.net/mern"
// open the connection to mongodb
mongoose.connect(conString)
// get reference to connection
let db = mongoose.connection

// verify if connection was successful
db.once("open", ()=>{
    console.log("Connected to mongodb database in cloud")
})

// endpoint -> http://localhost:8887.com GET
app.get("/", (request, response)=>{
    console.log("Incoming request")
    console.log(request.url)
    // send back response
    response.json({
        "message": "GET request received for / endpoint"
    })
})

// endpoint -> http://localhost:8887.com/welcome GET
app.get("/welcome", (request, response)=>{
    console.log("Incoming request")
    console.log(request.url)
    // send back response
    response.json({
        "message": "GET request received for /welcome endpoint"
    })
})

// endpoint -> http://localhost:8887.com/welcome POST
app.post("/welcome", (req,res)=>{
    console.log("Incoming request")
    console.log(req.url)
    console.log(req.body);
    // send response
    res.json({
        "message": "POST request received for /welcome endpoint",
        "received": req.body

    })
})

// api to interact with mongodb

// get list of tweets from database
app.get("/tweets/all", (request,response)=>{
    console.log("get all tweets from API")
    tweet.find({})
        .then((data)=>{
            console.log(data)
            response.json(data)
        })
        .catch((error)=>{
            console.log(error)
            response.json(error)
        })
})

// post tweet to db
app.post("/tweets/add", (request,response)=>{
    console.log("post tweet to db")
    console.log(request.body)
    // transfer values from requestbody to newTweet
    let newTweet = new tweet()
    newTweet.message = request.body.message
    newTweet.author = request.body.author
    newTweet.likes = request.body.likes
    newTweet.dislikes = request.body.dislikes
    newTweet.videoid = request.body.videoid
    // save newTweet in db
    newTweet.save()
            .then(()=>{
                response.json(data)
            })
            .catch((error)=>{
                response.json(error)
            })
        })


// define a port for API to run
let PORT = 8887

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})