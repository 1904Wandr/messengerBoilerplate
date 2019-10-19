const express = require('express')
const app = express()
const apiKey = require('./secrets')
const axios = require('axios')

//restaurants within a given lat and long
app.get('/restaurantsWithinArea', async (req, res, next) => {
  const {data} = await axios.get(
    'https://api.yelp.com/v3/events?latitude=40.7128&longitude=-74.0060&radius=10000&sort_on=time_start&limit=10',
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  )
  res.send(data)
})

app.listen(5000, () => {
  console.log('listening')
})
