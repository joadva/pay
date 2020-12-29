const stripe = require('stripe')('');
const arriba= sk_test_51Hb81WHL9bcHQvqV9H3UZgLDC4NfTJGXtTVCBxH6aUAn50jPMAJ3K46YEQpsUU3LBixSzE69WywRCqUM2qpJzcL900jUGb42I5;
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: ' Cuidamed',
            },
          unit_amount: 120000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));