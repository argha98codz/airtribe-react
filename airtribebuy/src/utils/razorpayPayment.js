export default function razorpayPayment({amount, address}) {
    // Replace with your Razorpay key
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    console.log(razorpayKey);

    // Payment options
    const options = {
      key: razorpayKey,
      amount: amount,
      currency: 'USD',
      name: 'AirtribeBuy',
      description: 'Test Transaction',
      image: 'https://yourlogo.com/logo.png',
      handler: function (response) {
        alert('Payment Successful');
        console.log(response);
      },
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: address,
      },
      theme: {
        color: '#3399cc',
      },
    };

    // Create Razorpay payment
    const rzp = new window.Razorpay(options);
    rzp.open();
};