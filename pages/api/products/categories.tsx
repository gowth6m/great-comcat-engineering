import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async (req: any, res: any) => {
  await db.connect();
  const categories = await Product.find().distinct("category");
  await db.disconnect();
  res.send(categories);
};

export default handler;
