// /pages/api/someApiRoute.ts

import { firestore } from "./firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const snapshot = await firestore.collection("yourCollection").get();
      const data = snapshot.docs.map((doc) => doc.data());
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
