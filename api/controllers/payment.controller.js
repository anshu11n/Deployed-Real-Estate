import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutSession = async (req,res) => {
    try {

        const { post } = req.body;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: post.title,
              },
              unit_amount: post.price * 100,
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/payment-success?post_id=${post.id}`,
          cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        });
      
        res.json({ id: session.id });
      

    } catch (error) {
        res.status(500).json({error: "Failed checkout session"}); 
    }
};