const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// SChema or Blueprint
// const genreSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//     }
// });

// This block connects the model and 
// creates a collection or table in the DB 'Genre' must be singular
// const Genre = new mongoose.model('Genre', genreSchema);


// OR 
// This block connects the model and 
// creates a collection or table in the DB 'Genre' must be singular
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

// GET ALL GENRE using the async / await magic
router.get('/', async(req,res) => {
    const genres = await Genre
                        .find()
                        .sort('name');
    res.send(genres);
});

// POST 
router.post('/', async(req,res) => {
    const {error} = valideCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.put(':id', async(req,res) => {
    // Validate
    // If invalid, return 400 - Bad request
    // const result = valideCourse(req.body); NB: ~using destructuring
    const {error} = valideCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })

    if (!genre) return res.status(404).send('The genre with that ID does not exist');
   
 
    // Return the updated course
    res.send(genre);
});

router.delete(':id', async(req, res) => {
    // Look up the course
    const genre = await Genre.findByIdAndRemove(req.params.id);
   
    if (!genre) return res.status(404).send('That ID does not correspond to any course.');

    // Return the same course
    res.send(genre);
});

router.get(':id', async(req,res) => { // Routes Parameter
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) return res.status(404).send('That ID does not correspond to any genre.');
    res.send(genre);
 });



 const valideCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
