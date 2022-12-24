import { getSession } from "next-auth/react";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async (req: any, res: any) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();
  res.send(products);
};

export default handler;