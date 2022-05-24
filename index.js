const express = require('express');
const app = express();
const ExcelToPdfRoutes = require('./excelToPdf');

var cors = require('cors');
app.use(cors()); //allowing Access-Control-Allow-Origin cors for access from client

app.use(express.json());
app.use('/api', ExcelToPdfRoutes);


app.use(function(error, req, res, next){
	// console.log(error);
	if(error){
	return res.status(422).json({
		status: false,
		error: error,
	});}
  });


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));