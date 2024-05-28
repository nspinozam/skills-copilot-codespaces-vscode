// Create web server
// 1. Load the express module
// 2. Create an express application
// 3. Create a route for GET requests to the root URL
// 4. Create a route for POST requests to the root URL
// 5. Create a route for GET requests to the /comments URL
// 6. Create a route for POST requests to the /comments URL
// 7. Create a route for GET requests to the /comments/:id URL
// 8. Create a route for PUT requests to the /comments/:id URL
// 9. Create a route for DELETE requests to the /comments/:id URL
// 10. Start the server

const express = require('express');
const bodyParser = require('body-parser');
const commentStore = require('./commentStore');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/comments', (req, res) => {
  const comments = commentStore.getComments();
  res.send(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  commentStore.addComment(comment);
  res.status(201).send(comment);
});

app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = commentStore.getComment(id);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  const success = commentStore.updateComment(id, comment);
  if (success) {
    res.send(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const success = commentStore.deleteComment(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});