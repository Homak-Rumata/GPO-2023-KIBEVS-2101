const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mainRouts = require('./routes/api-main-routes');
const formRouts = require('./routes/api-form-routes');
const {connect} = require("./models/db");

const app = express();
const PORT = 3001;
connect();

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));

app.use(mainRouts);
app.use(formRouts);

