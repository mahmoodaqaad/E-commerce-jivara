import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCreditCard,
    faTruck,
    faCheckCircle,
    faLock,
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
    faUser,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../../../Context/MyState';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
    const { products, GetAllProducts, isChangeInCart } = useContext(MyContext);
    const [cartItems, setCartItems] = useState([]);
    const [shipping, setShipping] = useState('standard');
    const [payment, setPayment] = useState('card');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'United States'
    });

    useEffect(() => {
        GetAllProducts();
    }, [GetAllProducts]);

    useEffect(() => {
        const productinCart = JSON.parse(localStorage.getItem(`yourCart`)) || [];
        const validItems = [];
        productinCart.forEach(savedItem => {
            const product = products.find(p => +p.id === +savedItem.id);
            if (product) {
                validItems.push({ ...product, count: savedItem.count });
            }
        });
        setCartItems(validItems);
    }, [products, isChangeInCart]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.count)), 0);
    const shippingCost = shipping === 'express' ? 15.00 : 0.00;
    const tax = subtotal * 0.05;
    const total = subtotal + shippingCost + tax;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation check
        if (!formData.fullName || !formData.email || !formData.address) {
            Swal.fire({
                title: 'Missing Info',
                text: 'Please fill in all required billing fields.',
                icon: 'warning',
                confirmButtonColor: 'var(--main-color)'
            });
            return;
        }

        let productinCart = JSON.parse(localStorage.getItem(`yourCart`))
        productinCart = []
        localStorage.setItem(`yourCart`, JSON.stringify(productinCart));

        console.log("Processing Order:", {
            customer: formData,
            items: cartItems,
            method: shipping,
            billing: payment,
            totalAmount: total.toFixed(2)

        });

        Swal.fire({
            title: 'Order Placed!',
            text: `Thank you, ${formData.fullName.split(' ')[0]}! Your order of $${total.toFixed(2)} is being processed.`,
            icon: 'success',
            confirmButtonColor: 'var(--main-color)',
            confirmButtonText: 'Great!'
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container text-center py-5">
                <div className="reveal-anim">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-muted-alt mb-3" style={{ fontSize: '4rem', opacity: 0.2 }} />
                    <h2 className="fw-bold">Your cart is empty</h2>
                    <p className="text-muted-alt">Add some products before checking out.</p>
                    <Link to="/category" className="btn-premium btn-premium-primary mt-3 text-decoration-none">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container reveal-anim">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                    <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/category" className="text-decoration-none text-muted">Shop</Link></li>
                    <li className="breadcrumb-item active text-main" aria-current="page">Checkout</li>
                </ol>
            </nav>

            <h1 className="checkout-section-title gradient-text">Secure Checkout</h1>

            <div className="checkout-grid">
                {/* Left Column: Form */}
                <div className="checkout-main">
                    <div className="checkout-card mb-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center">
                            <span className="step-icon me-3">1</span>
                            Billing Information
                        </h5>
                        <form className="checkout-form row g-3">
                            <div className="col-md-12">
                                <label className="form-label">Full Name</label>
                                <div className="position-relative">
                                    <FontAwesomeIcon icon={faUser} className="form-icon position-absolute top-50 translate-middle-y ms-3" />
                                    <input type="text" name="fullName" className="form-control ps-5" placeholder="John Doe" required value={formData.fullName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email Address</label>
                                <div className="position-relative">
                                    <FontAwesomeIcon icon={faEnvelope} className="form-icon position-absolute top-50 translate-middle-y ms-3" />
                                    <input type="email" name="email" className="form-control ps-5" placeholder="john@example.com" required value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <div className="position-relative">
                                    <FontAwesomeIcon icon={faPhone} className="form-icon position-absolute top-50 translate-middle-y ms-3" />
                                    <input type="tel" name="phone" className="form-control ps-5" placeholder="+1 234 567 890" required value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Shipping Address</label>
                                <div className="position-relative">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="form-icon position-absolute top-50 translate-middle-y ms-3" />
                                    <input type="text" name="address" className="form-control ps-5" placeholder="123 Luxury St, App 4" required value={formData.address} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">City</label>
                                <input type="text" name="city" className="form-control" placeholder="New York" required value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Zip Code</label>
                                <input type="text" name="zipCode" className="form-control" placeholder="10001" required value={formData.zipCode} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Country</label>
                                <select name="country" className="form-control" value={formData.country} onChange={handleInputChange}>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className="checkout-card mb-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center">
                            <span className="step-icon me-3">2</span>
                            Shipping Method
                        </h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className={`option-card ${shipping === 'standard' ? 'selected' : ''}`} onClick={() => setShipping('standard')}>
                                    <div className="step-icon small bg-light text-main">
                                        <FontAwesomeIcon icon={faTruck} />
                                    </div>
                                    <div className="option-info">
                                        <h6>Standard Shipping</h6>
                                        <p>3-5 Business Days • Free</p>
                                    </div>
                                    <div className="ms-auto">
                                        <FontAwesomeIcon icon={faCheckCircle} className={shipping === 'standard' ? 'text-main' : 'text-muted'} style={{ opacity: shipping === 'standard' ? 1 : 0.2 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className={`option-card ${shipping === 'express' ? 'selected' : ''}`} onClick={() => setShipping('express')}>
                                    <div className="step-icon small bg-light text-main">
                                        <FontAwesomeIcon icon={faTruck} />
                                    </div>
                                    <div className="option-info">
                                        <h6>Express Shipping</h6>
                                        <p>1-2 Business Days • $15.00</p>
                                    </div>
                                    <div className="ms-auto">
                                        <FontAwesomeIcon icon={faCheckCircle} className={shipping === 'express' ? 'text-main' : 'text-muted'} style={{ opacity: shipping === 'express' ? 1 : 0.2 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-card">
                        <h5 className="fw-bold mb-4 d-flex align-items-center">
                            <span className="step-icon me-3">3</span>
                            Payment Method
                        </h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <div className={`option-card ${payment === 'card' ? 'selected' : ''}`} onClick={() => setPayment('card')}>
                                    <FontAwesomeIcon icon={faCreditCard} className="text-main" />
                                    <div className="option-info">
                                        <h6>Card</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={`option-card d-flex flex-wrap align-items-center  ${payment === 'paypal' ? 'selected' : ''}`} onClick={() => setPayment('paypal')}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-badge" />
                                    <div className="option-info">
                                        <h6 className='hidden '>PayPal</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={`option-card ${payment === 'apple' ? 'selected' : ''}`} onClick={() => setPayment('apple')}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="payment-badge" style={{ filter: 'grayscale(1)' }} />
                                    <div className="option-info">
                                        <h6>Apple Pay</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {payment === 'card' && (
                            <div className="row g-3 reveal-anim">
                                <div className="col-12">
                                    <label className="form-label">Card Number</label>
                                    <input type="text" className="form-control" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Expiry Date</label>
                                    <input type="text" className="form-control" placeholder="MM/YY" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">CVV</label>
                                    <input type="text" className="form-control" placeholder="123" />
                                </div>
                            </div>
                        )}

                        {payment === 'paypal' && (
                            <div className="reveal-anim text-center py-4 px-3 rounded-4" style={{ background: 'rgba(0, 112, 186, 0.05)', border: '1px dashed rgba(0, 112, 186, 0.2)' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="mb-3" style={{ height: '35px' }} />
                                <p className="text-muted-alt small mb-3">You will be redirected to PayPal to complete your purchase securely.</p>
                                <button className="btn w-100 py-3 fw-bold shadow-sm" style={{ background: '#FFC439', color: '#003087', borderRadius: '12px' }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{ height: '20px', marginRight: '8px' }} />
                                    Pay with PayPal
                                </button>
                            </div>
                        )}

                        {payment === 'apple' && (
                            <div className="reveal-anim text-center py-4 px-3 rounded-4" style={{ background: 'rgba(0, 0, 0, 0.05)', border: '1px dashed rgba(0, 0, 0, 0.1)' }}>
                                <FontAwesomeIcon icon={faLock} className="mb-3 text-muted-alt" style={{ fontSize: '1.5rem' }} />
                                <p className="text-muted-alt small mb-3">Pay securely using your Apple ID and Touch ID / Face ID.</p>
                                <button className="btn btn-dark w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '12px' }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ height: '20px', filter: 'invert(1)' }} />
                                    Pay with Apple Pay
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="checkout-sidebar">
                    <div className="checkout-card sticky-top" style={{ top: '100px' }}>
                        <h5 className="fw-bold mb-4">Order Summary</h5>
                        <div className="summary-list">
                            {cartItems.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <div className="summary-img">
                                        <img src={JSON.parse(item.images)[0]} alt={item.title} className="w-100 h-100 object-fit-cover" />
                                    </div>
                                    <div className="summary-details flex-grow-1">
                                        <h6 className="text-truncate" style={{ maxWidth: '150px' }}>{item.title}</h6>
                                        <span className="text-secondary small">Qty: {item.count}</span>
                                    </div>
                                    <div className="summary-price fw-bold">
                                        ${(Number(item.price) * Number(item.count)).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-price-box">
                            <div className="summary-row">
                                <span className="text-secondary">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span className="text-secondary">Shipping</span>
                                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row">
                                <span className="text-secondary">Tax (5%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-total">
                                <span>Order Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            className="btn-premium btn-premium-primary w-100 mt-4 py-3 justify-content-center text-decoration-none"
                            onClick={handleSubmit}
                        >
                            Place Order
                            <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                        </button>

                        <div className="text-center mt-3 text-secondary small d-flex align-items-center justify-content-center gap-2">
                            <FontAwesomeIcon icon={faLock} />
                            Secure SSL Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
