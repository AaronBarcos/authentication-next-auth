import dbConnect from "../../../lib/db/index";

export default async function handler(req, res) {
    
    const { method } = req;

    await dbConnect();

    if (method === "GET") {
        res.status(200).json({ message: "Hello World" });
    }
    else {
        res.status(400).json({ message: "Invalid request method" });
    }

}
