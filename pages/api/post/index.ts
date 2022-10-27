// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // if (req.method === "GET") {
    //   const query = allPostsQuery();

    //   const data = await client.fetch(query);
    //   res.status(200).json(data);
    // } else if (req.method === "POST") {
    //   const document = req.body;

    //   client.create(document).then(() => res.status(201).json("Video Created"));
    // }
    res.status(200).json({});
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}