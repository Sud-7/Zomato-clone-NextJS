import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams; //we are taking out the params like api/customer?location=delhi v30
  console.log(queryParams.get("location"));
  //   so we could have done console.log(queryParams) -> it would have shown location => Delhi v30
  let filter = {}; //created filter to save the location
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } }; //used regex here to make it case-insensitive as there could be a case of delhi and Delhi
  } else if (queryParams.get("restaurant")) {
    let name = queryParams.get("restaurant");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  let result = await restaurantSchema.find(filter);
  return NextResponse.json({ success: true, result });
}
