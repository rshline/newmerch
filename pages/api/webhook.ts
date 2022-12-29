import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../models/Order';
import User from '../../models/User';
import dbConnect from '../../utils/mongo';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await dbConnect()

    if (req.method === 'POST') {

        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event;

        try {
          event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err: any) {
          console.log('webhook error: ', err.message)
          return res.status(400).send(`Webhook error: ${err.message}`)
        }

        if (event.type == 'checkout.session.completed') {
            const session = event.data.object

            User.updateOne(
              {queryField: 1},
              {$setOnInsert: { email: session.metadata.email }},
              { upsert: true }
            )

            const customer_address = session.customer_details.address.line1.concat(
              " ", session.customer_details.address.line2,
              " ", session.customer_details.address.city,
              ", ", session.customer_details.address.state,
              " ", session.customer_details.address.postal_code,
              " ", session.customer_details.address.country)

            return Order.create({
                customer_email: session.metadata.email,
                address: customer_address,
                total: session.amount.total / 100,
                total_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
            }).then(() => res.status(200))
            .catch(err => res.status(400).send(`Webhook error: ${err.message}`))
        }
    }
}

export const config ={
  api:{
    bodyParser: false,
    externalResolver: true 
  }
}