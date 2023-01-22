// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  axios
    .get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${req.query.target}`)
    .then((resp) => {
      res.status(200).json(resp.data);
    });
}
