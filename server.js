require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movies-data.json')
const cors = require('cors');
const helmet = require('helmet')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_KEY
    console.log(apiToken)
    const authToken = req.get('Authorization')

    
    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }

    next()
})



// Users can search for Movies by genre, country or avg_vote
// The endpoint is GET /movie
// The search options for genre, country, and/or average vote are provided in query string parameters.
// When searching by genre, users are searching for whether the Movie's genre includes a specified string. The search should be case insensitive.
// When searching by country, users are searching for whether the Movie's country includes a specified string. The search should be case insensitive.
// When searching by average vote, users are searching for Movies with an avg_vote that is greater than or equal to the supplied number.
// The API responds with an array of full movie entries for the search results

function handleMovies(req, res, next) {
    let movies = MOVIES;

    res.send(movies)
}

app.get('/movie', handleMovies)



const PORT = 8000
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})