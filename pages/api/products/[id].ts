import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import dbConnect from "../../../utils/mongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  await dbConnect();

  switch (method) {
        case 'GET':
            try {
                const product = await Product.findById(id);
                res.status(200).json(product);
            } catch (err) {
                res.status(500).json(err);
            }
            break
        case 'PUT':
            if(!token || token !== process.env.token){
            return res.status(401).json("Not authenticated!")
            }
            try {
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(product);
            } catch (err) {
            res.status(500).json(err);
            }
            break
        case 'DELETE':
            if(!token || token !== process.env.token){
                return res.status(401).json("Not authenticated!")
            }
            try {
                await Product.findByIdAndDelete(id);
                res.status(200).json("The product has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}