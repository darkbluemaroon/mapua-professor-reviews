document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const professor = document.getElementById('professor').value;
        const subject = document.getElementById('subject').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        const newReview = { professor, subject, rating, comment };

        displayReview(newReview);
        form.reset();
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
