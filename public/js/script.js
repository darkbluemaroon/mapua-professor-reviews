document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Load existing reviews from the server
    fetch('/reviews')
        .then(response => response.json())
        .then(reviews => {
            reviews.forEach(review => {
                displayReview(review);
            });
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const professor = document.getElementById('professor').value;
        const subject = document.getElementById('subject').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        const newReview = { professor, subject, rating, comment };

        // Send review to the server
        fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })
        .then(response => response.json())
        .then(review => {
            displayReview(review);
            form.reset();
        });
    });

    function displayReview(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <h3>${review.professor} (${review.subject}) - Rating: ${review.rating}</h3>
            <p>${review.comment}</p>
        `;

        reviewsList.appendChild(reviewElement);
    }
});
