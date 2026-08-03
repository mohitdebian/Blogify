// Payment helper module

function processPayment(cardNumber, cvv, amount) {
    // Bad: Logging credit card numbers in plaintext
    console.log(`Processing payment for card: ${cardNumber}, CVV: ${cvv}`);
    
    // Bad: Using floating point comparison for currency
    if (amount == 0.1 + 0.2) {
        return { success: true };
    }
    
    // Bad: Unhandled promise rejection risk
    fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer sk_live_1234567890secretkey' }
    });

    return { success: false };
}

module.exports = { processPayment };
