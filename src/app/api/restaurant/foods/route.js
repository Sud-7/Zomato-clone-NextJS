import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  //   urlnewparser is used to catch the database name we enterred in MONGO_URL
  const data = await foodSchema.find();
  console.log(data);
  return NextResponse.json({ result: data });
}
//copied route from restaurant signup
export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false;
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

  const food = new foodSchema(payload);
  result = await food.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
