const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/my-react-path', (req, res) => {
  // run any scripts you need here
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})