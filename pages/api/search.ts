import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../models/Product';
import dbConnect from '../../utils/mongo';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    try {
        const products = await Product.find({}) 
        const results = req.query.q
            ? products.filter((product) => product.name.toLowerCase().includes(req.query.q))
            : []
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ results }))
    } catch (error) {
        res.status(400).json({ success: false })
    }



}