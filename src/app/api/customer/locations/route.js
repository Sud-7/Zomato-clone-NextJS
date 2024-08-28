import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  //v28
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  let result = await restaurantSchema.find();
  result = result.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1) //why we did this? -> some of the city names were in capital and small -> chnager to first uppercase
  ); //basically at char0 we made it to uppercase and and joined them
  result = [...new Set(result.map((item) => item))];

  return NextResponse.json({ success: true, result });
}
