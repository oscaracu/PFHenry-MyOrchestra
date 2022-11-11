import type { NextApiRequest, NextApiResponse } from 'next'
import {getOrchestrasPost,postPost} from "../../../controllers/post"




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";


    let {
      method,
      body,
      query
    } = req;


    try {
        switch (method) {
            case GET:
              const getpostbyorchestra = await getOrchestrasPost(query)   
              return getpostbyorchestra ? res.status(200).json(getpostbyorchestra):res.status(400).json([])
            case POST:   
              const post_post = await postPost(body)
              return post_post? res.status(201).json(post_post):res.status(400).json({error:"mandatory data missing: "})
            default:
              return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).send(error) 
    }

}