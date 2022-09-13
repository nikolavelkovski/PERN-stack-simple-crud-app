require('dotenv').config()
const { json } = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const db = require('./db')

const app = express()
app.use(express.json())



//routes

app.get('/api/v1/restaurants', async(req,res) => {

    try {
        const results = await db.query('SELECT * FROM restourants')
  
    res.status(200).json({
        status: "success",
        result: results.rowCount,
        data:{
            restaurants: results.rows,
        }
    })
        
    } catch (error) {
        console.log(
            error
        )
    }
    
})
app.get('/api/v1/restaurants/:restaurantId', async(req,res) => {

    try {
        const results = await db.query(`SELECT * FROM restourants WHERE id = ${req.params.restaurantId}`)
  
    res.status(200).json({
        status: "success",
        data:{
            restaurants: results.rows[0],
        }
    })
        
    } catch (error) {
        console.log(
            error
        )
    }
    
})
app.post('/api/v1/restaurants/', async(req,res) => {

    try {
        const results = await db.query(`INSERT INTO restourants (name,location, price_range) values ($1, $2, $3) returning *`,
        [req.body.name,req.body.location,req.body.price_range])
  
    res.status(200).json({
        status: "success",
        data:{
            restaurants: results.rows[0],
        }
    })
        
    } catch (error) {
        console.log(
            error
        )
    }
    
})
app.put('/api/v1/restaurants/:restaurantId', async(req,res) => {

    try {
        const results = await db.query(`UPDATE restourants SET name = $1, location = $2, price_range = $3 WHERE id = ${req.params.restaurantId} returning *`,
        [req.body.name,req.body.location,req.body.price_range])
  
    res.status(204).json({
        status: "success",
        data:{
            restaurants: results.rows[0],
        }
    })
        
    } catch (error) {
        console.log(
            error
        )
    }
    
})
app.delete('/api/v1/restaurants/:restaurantId', async(req,res) => {

    try {
        const results = await db.query(`DELETE FROM restourants WHERE id = ${req.params.restaurantId}`)
  
    res.status(204).json({
        status: "success",
        data:{
            restaurants: results.rows[0],
        }
    })
        
    } catch (error) {
        console.log(
            error
        )
    }
    
})
// app.get('/api/v1/restaurants/:restaurantId', (req,res) => {
    
  
// })
// app.post('/api/v1/restaurants', (req,res) => {
//     console.log(req.body)
  
// })
// app.patch('/api/v1/restaurants/', (req,res) => {
    
  
// })
// app.delete('/api/v1/restaurants/', (req,res) => {
    
  
// })
const port =process.env.PORT || 3001
app.listen(port,()=> {
    console.log("server its up listening on port " + port)
})