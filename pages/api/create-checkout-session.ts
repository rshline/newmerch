import { NextApiRequest, NextApiResponse } from "next";
import { productType } from "../../utils/custom";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  const { items, email } = req.body

  const transformItems = items.map((item: productType) => ({
    price_data: {
      currency: 'USD',
      unit_amount: item.prices * 100,
      product_data: {
        name: item.name,
        images: [item.img]
      }
    },
    description: item.desc,
    quantity: 1
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates:['shr_1MHnMnJBarasMAzmVKAOmGHE'],
    shipping_address_collection: {
      allowed_countries: []
    },
    line_items: transformItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: productType) => item.img))
    }
  });

  res.status(200).json({id: session.id})
};