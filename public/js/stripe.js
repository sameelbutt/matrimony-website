document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stripe
    let stripe = Stripe('pk_test_51PfrbuKJMD78Orv2cIBFOoromlVvOeheMzLtP7AFbPAEI2S4Z9SENYezK46NLUElUzmXpMxkzmuIHsMetflIvrf800X5lO2MZS');

    // Function to book hall
    const bookhall = async (id) => {
        try {
            // console.log(`Booking hall with ID: ${id}`);
            const res = await axios({
                method: 'GET',
                url: `http://127.0.0.1:3000/api/v2/bookings/checkout/${id}` // Updated to match the registered route
            });
            console.log(res);
            console.log(res.data.sessionId);
    await stripe.redirectToCheckout({
        sessionId: res.data.session.id
    });
}
            
            // Handle Stripe checkout here if necessary
         catch (err) {
            // console.error('Error booking hall:', err);
            alert('Error booking hall. Please try again.');
        }
    };

    // Event listener for booking hall button
    let hallbook = document.getElementById('book-event');
    if (hallbook) {
        hallbook.addEventListener('click', e => {
            e.preventDefault();
            e.target.textContent = 'Processing...';
            let eventId = e.target.getAttribute('data-event-id'); // Ensure this matches the data attribute in the Pug template
            bookhall(eventId);
        });
    }
});
