import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../models/Product';
import dbConnect from '../../../utils/mongo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const products = await Product.find({}) 
                res.status(200).json({ success: true, data: products })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const product = await Product.create(req.body)
                res.status(201).json({ success: true, data: product })
            } catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}