const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(bodyParser.json());

// Load reviews from a file
function loadReviews() {
    try {
        const data = fs.readFileSync('reviews.json');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Save reviews to a file
function saveReviews(reviews) {
    fs.writeFileSync('reviews.json', JSON.stringify(reviews));
}

// Handle GET request to fetch reviews
app.get('/reviews', (req, res) => {
    res.json(loadReviews());
});

// Handle POST request to submit a review
app.post('/submit-review', (req, res) => {
    const newReview = req.body;
    const reviews = loadReviews();
    reviews.push(newReview);
    saveReviews(reviews);
    res.status(201).json(newReview);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
