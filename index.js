const express = require('express');
const app = express();
const ExcelToPdfRoutes = require('./excelToPdf');

var cors = require('cors');
app.use(cors()); //allowing Access-Control-Allow-Origin cors for access from client
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("pdf"))
app.use('/api', ExcelToPdfRoutes);

app.use(function(error, req, res, next){
	// console.log(error);
	if(error){
	return res.status(422).json({
		status: false,
		error: error,
	});}
  });


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));