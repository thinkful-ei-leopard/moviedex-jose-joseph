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
    const authToken = req.get('Authorization')

    
    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }

    next()
})


function handleMovies(req, res, next) {
    let { genre, country, avg_vote } = req.query
    let response = MOVIES;

    if(genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()))
    }

    if(country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()))
    }

    if(avg_vote) {
        response = response.filter(movie => Number(movie.avg_vote) >= Number(req.query.avg_vote))
    }

    res.send(response)
}

app.get('/movie', handleMovies)

module.exports = app;

