import React from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
import BillingForm from './BillingForm';
import CheckoutSummary from './CheckoutSummary';
import authApiClient from '../../services/Auth-Api-Client';

const BookingCheckout = () => {
    const location = useLocation();
    
    // 2. Extract the data sent from the BookingSidebar
    // This matches the "state" we sent in the previous step
    const bookingData = location.state || {};
    const { totalPrice, bookingId } = bookingData;

    const handlePayment = async () => {
        // 3. Check if the data exists
        if (!totalPrice) {
            console.error("Booking data is missing!");
            alert("No booking data found. Please start from the room selection page.");
            return;
        }

        try {
            const payload = { 
                amount: totalPrice, 
                bookingId: bookingId || "123" // Fallback for testing
            };

            const response = await authApiClient.post("/payment/initiate/", payload);
            
            if (response.data.payment_url) {
                // 4. Redirect to SSLCommerz
                window.location.href = response.data.payment_url;
            }
        } catch (error) {
            console.log("Payment Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="h-40 bg-slate-50 flex items-center justify-center border-b border-slate-100">
                <h1 className="text-xs uppercase tracking-[0.8em] text-slate-400 font-bold">Booking Checkout</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3">
                        <BillingForm />
                        <div className="mt-12">
                            <button 
                                onClick={handlePayment} 
                                className="px-12 py-5 bg-[#1e2d35] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#b1a494] transition-all duration-300"
                            >
                                Proceed to Payment (${totalPrice || '0.00'})
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        {/* Pass the data to your summary component too */}
                        <CheckoutSummary data={bookingData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCheckout;