const express = require('express');
const app = express();
const summarizeText = require('./summarize.js');
const port = 3000;



// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

app.get('/', function(req, res){
  console.log("RUNNING\n");
  res.sendFile(__dirname + '/public/index.html');
});
// Handle POST requests to the '/summarize' endpoint

app.post('/api/summarize', (req, res) => {

  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

   // call your summarizeText function, passing in the text from the request
  summarizeText(text) 
    .then(response => {
       res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});


app.listen(port, () => {
  console.log("Server running at http://localhost:3000/");
});