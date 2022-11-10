// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteOrchestra, getOrchestras, postOrchestras, updateOrchestra } from '../../controllers/orquestas'
import { getUsersPost, postUsersPost } from '../../controllers/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const GET:string="GET";
    const POST:string="POST";
    const DELETE:string="DELETE";
    const PUT:string="PUT";


    let {
      method,
      body,
      query: { name },
    } = req;


    try {
        switch (method) {
            case GET:
              const allOrchestras =await  getUsersPost();
            return res.status(200).json(allOrchestras)
            case POST:
              const addOrchestra =await postUsersPost(body)
            return res.status(201).json(addOrchestra)
            case DELETE:
              const deleteOrchestra2 = await deleteOrchestra(body.name)
            return res.status(200).json(deleteOrchestra2)
            case PUT:
              const update2 = await updateOrchestra(name,body)
              return res.status(200).json(update2)
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json(error)
    }

}

