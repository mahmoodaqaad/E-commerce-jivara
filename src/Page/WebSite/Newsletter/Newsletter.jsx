import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
    return (
        <div className="newsletter-section">
            <h2>Stay Updated!</h2>
            <p>Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <div className="newsletter-form">
                <div className="row g-2 justify-content-center justify-content-md-between">
                    <div className='col-12 col-md-10'>

                        <input type="email" className='w-100' placeholder="Enter your email" />

                    </div>
                    <div className='col-12 col-md-2'>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
