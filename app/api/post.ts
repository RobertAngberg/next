import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Assuming the sent data is a JSON object
      const data = req.body;
      console.log(data);

      // Send a response
      res
        .status(200)
        .json({ message: "Data received successfully", receivedData: data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // If the request is not a POST, return a 405 Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
