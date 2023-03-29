const handlebars = require('express-handlebars');

// Require Libraries
const express = require('express');
const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": "AIzaSyA_DSMmgW8cTYDNzjKvxtSZY_qY6HV5Dd4",
  "Filter": "high",
  "Locale": "en_US",
});

// App Setup
const app = express();

// Middleware
//allow Express (our web framework) to render HTML templates and send them back to the client using a new function

const hbs = handlebars.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo() { return 'FOO!'; },
    bar() { return 'BAR!'; }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
    .then(response => {
      // store the gifs we get back from the search
      const gifs = response;
      // pass the gifs as an object into the home page
      res.render('home', { gifs })
    }).catch(console.error);
})

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})

// Start Server

//tells the app to log a message on port 3000. Once we start the server, we should see that message in the terminal 
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});