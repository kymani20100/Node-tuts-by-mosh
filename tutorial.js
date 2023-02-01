const courses = [
    {id: 1, name: 'React Native'},
    {id: 2, name: 'Node JS'},
    {id: 3, name: 'Figma'},
];

/// RUNDOWM
async function getCourse() {

    const courses = await courses
                    // Find by author i.e where author is "John"
                    .find({author: 'Mosh', isPublished: true})
                    // Limit the returned value
                    .limit(10)
                    // Sort DESC or ASC e.g name: -1 = DESC
                    .sort({name: 1})
                    // Return specific fields only e.g SELECT (name,password,email)
                    .select({name: 1, tags: 1})
}

 // COMPARISM OPERATORS
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    async function getCourse() {

        const courses = await courses
                        // Find courses that are $10 i.e where price is equal to "$10"
                        .find({price: 10})
                        // Find courses that are greater $10 or less than $20
                        // i.e where price > "$10" || < "$20"
                        .find({price: {$gt: 10, $lte: 20}})
                        // Find courses that are in
                        // i.e where price in [10, 15, 20]
                        .find({price: {$in: [10, 15, 20]}})
                        // Limit the returned value
                        .limit(10)
                        // Sort DESC or ASC e.g name: -1 = DESC
                        .sort({name: 1})
                        // Return specific fields only e.g SELECT (name,password,email)
                        .select({name: 1, tags: 1})
    }


    ////////////////////////////////////////////////////
    // LOGICAL OPERATORS
    // OR AND

    async function getCourse() {

        const courses = await courses
                        // Find must be empty in a logical clause"
                        .find()
                        // OR Logical method
                        .or([{author: 'Kymani'}, {isPublished: true}])
                        // AND Logical method
                        .and([{author: 'Kymani'}, {isPublished: true}])
                        // Limit the returned value
                        .limit(10)
                        // Sort DESC or ASC e.g name: -1 = DESC
                        .sort({name: 1})
                        // Return specific fields only e.g SELECT (name,password,email)
                        .select({name: 1, tags: 1})
    }


    ////////////////////////////////////////////////////
    // REGULAR EXPRESSIONS
    // FF

    async function getCourse() {

        const courses = await courses
                        // Find all Starting with Kymani"
                        .find({author: /^Kymani/})
                        // Find all Ending with Kymani (case insensitive)"
                        .find({author: /Kymani$/i })
                        // Find all Containing Kymani"
                        .find({author: /.*Kymani.*/i })
                        // Limit the returned value
                        .limit(10)
                        // Sort DESC or ASC e.g name: -1 = DESC
                        .sort({name: 1})
                        // Return specific fields only e.g SELECT (name,password,email)
                        .select({name: 1, tags: 1})
    }


////////////////////////////////////////////////////
    // COUNT OF TABLES
    // FF

    async function getCourse() {

        const courses = await courses
                        // Find all Starting with Kymani"
                        .find({author: /^Kymani/})
                        // Limit the returned value
                        .limit(10)
                        // Sort DESC or ASC e.g name: -1 = DESC
                        .sort({name: 1})
                        // Return specific fields only e.g SELECT (name,password,email)
                        .count()
    }

////////////////////////////////////////////////////
    // PAGINATION
    // FF

    async function getCourse() {
        const pageNumber = 2;
        const pageSize = 10;

        const courses = await courses
                        // Find all Starting with Kymani"
                        .find({author: /^Kymani/})
                        // Formula for pagination
                        .skip((pageNumber - 1) * pageSize)
                        // Limit the returned value
                        .limit(pageSize)
                        // Sort DESC or ASC e.g name: -1 = DESC
                        .sort({name: 1})
                        // Return specific fields only e.g SELECT (name,password,email)
                        .select({name: 1, tags: 1})
    }


    // EXERCISE
    // Get all the published backend courses
    // sort them by their name
    // pick only their name and author
    // and display them

    const courseSchema = new mongoose.Schema({
        name: String,
        author: String, 
        tags: [String],
        date: Date,
        isPublished: Boolean,
        price: Number
    });

    const Course = mongoose.model('Course', courseSchema);

    async function getCourse() {
        return await Course
            .find({isPublished: true, tags: 'backend'})
            .sort({name: 1})
            .select({name: 1, author: 1});
    }

    async function run() {
        const courses = await getCourse();
        console.log(courses);
    }
    run();

// Get all the published frontend and backend courses
// sort them by their price in a descending order,
// pick only their name and author and display them

async function getCourse() {
    return await Course
        .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
        .sort({price: -1}) // sort('-price)
        .select({name: 1, author: 1});
}

async function getCourse() {
    return await Course
        .find({isPublished: true })
        .or([ {tags: 'frontend'}, {tags: 'backend'} ])
        .sort({price: -1}) // sort('-price)
        .select({name: 1, author: 1});
}

async function run() {
    const courses = await getCourse();
    console.log(courses);
}
run();

// Get all the published courses that are $15 or more,
// or have the word `by` in their title

async function getCourse() { // My Solution
    return await Course
        .find({isPublished: true, name: /.*by.*/i, price: {$gte: '$15'} })
        .sort({price: 1}) // sort('-price)
        .select({name: 1, author: 1});
}

async function getCourse() { // My Solution
    return await Course
        .find({isPublished: true})
        .or([
            {price: {$gte: '$15'}},
            {name: /.*by.*/i}
        ])
        .sort({price: 1}) // sort('-price)
        .select({name: 1, author: 1});
}

async function run() {
    const courses = await getCourse();
    console.log(courses);
}
run();


// QUERY FIRST
async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;

    if(course.isPublished) return;

    course.isPublished = true;
    course.author = "Emmanuel";

    const result = await course.save();
}


// UPDATE FIRST
async function updateCourse(id) {
    // Get the course by an id
    const result = await Course.update({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
   console.log(result)

   // To return the updated document, use the new: true
   const courseObj = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, {new: true});
}

// VALIDATION 
const coSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true, // Other useful SchemaType Options
        uppercase: true,
        trim: true
    },
    author: String, 
    tags: { // Custom tag validators
        type: Array,
        validate: {
            validate: {
                isAsync: true,
                validate: function(v, callback) {
                    setTimeout(() => {
                       const result = v && v.length > 0;
                        callback(result)
                    }, 1000);
                    
                    
                },
                message: 'A course should have at least one tag'
            }
        }
    },
    date: Date,
    isPublished: Boolean,
    price: {
        type: Number, 
        required: function() {return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

async function createCos() {
    const course = new Course({
        name: 'Angular',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    });

    try {
        // const result = await course.save();
        // console.log(result);
        await course.validate();
    } catch (ex) {
        // console.log(ex.message);
        // HAS AN errors property
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

