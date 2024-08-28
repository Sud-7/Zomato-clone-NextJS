import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  // v34.1  console.log(content.params.id); checking if we are getting the ID or not
  const id = content.params.id;
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  const details = await restaurantSchema.findOne({ _id: id }); //v34.2 using the id passed as params we are fetching the details of the account
  //v34.3 now we want to get the foods
  const foodItems = await foodSchema.find({ resto_id: id }); //v34.4 thats how we are getting all the details
  return NextResponse.json({ success: true, details, foodItems });
}
