const express = require("express")
const app = express()
const Blockchain = require('./blockchain')

const coin = new Blockchain()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/blockchain', (req, res) => {
    res.send(coin)
})

app.post('/transaction', (req, res) => {

})

app.get('/mine', (req, res) => {

})

app.listen(3000, ()=> {
    console.log("listening on port 3000")
})