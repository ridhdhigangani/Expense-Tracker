const express = require('express');
const {dbConnect} = require('./config/dbConnect');
const bodyParser = require('body-parser');
const userRoute = require('./Routes/UserRoute');
const transRoutes = require('./Routes/TransRoute');
const path = require('path')
const app = express();
const PORT = 3006;

dbConnect();
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'../frontend/build')))

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use('/',userRoute);
app.use('/',transRoutes);

app.listen(PORT, () => {
  console.log("App Listed on: "+PORT);
})