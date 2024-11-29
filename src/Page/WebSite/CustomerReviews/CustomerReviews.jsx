import React from 'react';
import './CustomerReviews.css';

const reviews = [
    {
        name: 'John Doe',
        review: 'This store has the best products! I love the service.',
        rating: 5,
    },
    {
        name: 'Jane Smith',
        review: 'Affordable prices and high-quality items. Highly recommend!',
        rating: 4,
    },
    {
        name: 'Emily Brown',
        review: 'Fast shipping and great customer support.',
        rating: 5,
    },
    {
        name: 'John Doe',
        review: 'This store has the best products! I love the service.',
        rating: 5,
    },
];

const CustomerReviews = () => {
    return (
        <div className="customer-reviews py-5 mb-2 mt-2">
            <h2 className="text-center mb-4">What Our Customers Say</h2>
            <div className="reviews-carousel">
                {reviews.map((review, index) => (

                    <div className="review-card" key={index}>
                        <p className="review-text">"{review.review}"</p>
                        <p className="review-author">- {review.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
