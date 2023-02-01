// const Joi     = require('joi');
// const express = require('express');
// const logger  = require('./logger');
// const app     = express(); // Creates an Express application. The express() function is a top-level function exported by the express module.

// app.use(express.json()); // Express json to parse json body from client.
// app.use(express.urlencoded({ extended: true })); // e.g., key=value&key=value (HTML Form). Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
// app.use(express.static('public')); // Makes public files available e.g., http://localhost:3000/readme.txt, http://localhost:3000/job.jpg. Without this middleware, this happens - Cannot GET /job.jpg

// // Custom Middleware
// app.use(logger);

// app.use(function(req,res,next) {
//     console.log('Authenticating...');
//     next();
// });

// const courses = [
//     {id: 1, name: 'React Native'},
//     {id: 2, name: 'Node JS'},
//     {id: 3, name: 'Figma'},
// ];

// // GET
// app.get('/', (req, res) => { // Routes HTTP GET requests to the specified path with the specified callback functions.
//     res.send('Hello World')
// });

// app.get('/api/courses', (req,res) => {
//     res.send(courses);
// });


// app.get('/api/courses/:id', (req,res) => { // Routes Parameter
//    const course = courses.find(c => c.id === parseInt(req.params.id));

//    if (!course) return res.status(404).send('That ID does not correspond to any course.');
//    res.send(course);
// });

// // POST 
// app.post('/api/courses', (req,res) => {
    
//     const {error} = valideCourse(req.body);

//     if(error) return res.status(400).send(error.details[0].message);

//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// });

// // UPDATE
// app.put('/api/courses/:id', (req,res) => {
//     // Look up the course
//     // If not existing, return 404
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) return res.status(404).send('That ID does not correspond to any course.');
   
//     // Validate
//     // If invalid, return 400 - Bad request
//     // const result = valideCourse(req.body); NB: ~using destructuring
//     const {error} = valideCourse(req.body);

//     if (error) return res.status(400).send(error.details[0].message);

//     // Update course
//     course.name = req.body.name;
//     // Return the updated course
//     res.send(course);
// });

// // DELETE
// app.delete('/api/courses/:id', (req, res) => {
//     // Look up the course
//     // Not existing, return 404
//     const course = courses.find(c => c.id === parseInt(req.params.id))
//     if (!course) return res.status(404).send('That ID does not correspond to any course.');

//     // Delete
//     const index = courses.indexOf(course);
//     courses.splice(index, 1);

//     // Return the same course
//     res.send(course);
// });

// const valideCourse = (course) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     return Joi.validate(course, schema);

// }

// // PORT - The process.env property returns an object containing the user environment
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on Port ${port}...`));


//////////////////////////////////////////////

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));