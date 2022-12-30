import { NextApiRequest, NextApiResponse } from "next";
import { cartItemType, productType } from "../../utils/custom";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  const { items, email } = req.body

  const transformItems = items.map((item: cartItemType) => ({
    price_data: {
      currency: "USD",
      unit_amount: Math.round(item.prices * 100),
      product_data: {
          name: item.name,
          description: item.desc, //description here
          images: [item.img],
      },
    },
    quantity: item.subqty
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [{shipping_rate: 'shr_1MHnMnJBarasMAzmVKAOmGHE'}],
    shipping_address_collection: {
      allowed_countries: ['US', 'KR']
    },
    line_items: transformItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: productType) => item.img))
    }
  });

  res.status(200).json({id: session.id})
};