const app = require('./server');

const PORT = 8000
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})