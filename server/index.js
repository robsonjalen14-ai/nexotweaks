require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Stripe = require('stripe');

const app = express();
const PORT = process.env.PORT || 3000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const products = {
  basic: {
    name: 'Nxo Tweaks Basic',
    price: 499,
    description: 'Essential FPS boost and input lag reduction tweaks.',
  },
  pro: {
    name: 'Nxo Tweaks Pro',
    price: 999,
    description: 'Advanced GPU, network, and game mode optimizations.',
  },
  extreme: {
    name: 'Nxo Tweaks Extreme',
    price: 1499,
    description: 'Maximum performance with timer resolution and DPC latency fixes.',
  },
  ultimate: {
    name: 'Nxo Tweaks Ultimate',
    price: 1999,
    description: 'The complete arsenal with debloat tool, custom profiles, and VIP support.',
  },
};

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { product } = req.body;
    const productData = products[product];

    if (!productData) {
      return res.status(400).json({ error: 'Invalid product' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productData.name,
              description: productData.description,
              images: [],
            },
            unit_amount: productData.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://nxotweaks.sellhub.cx'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://nxotweaks.sellhub.cx'}`,
      metadata: {
        product: product,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', products: Object.keys(products) });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Nxo Tweaks server running on port ${PORT}`);
});
