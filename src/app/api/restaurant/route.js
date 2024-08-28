import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  //   urlnewparser is used to catch the database name we enterred in MONGO_URL
  const data = await restaurantSchema.find();
  console.log(data);
  return NextResponse.json({ result: data });
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false; //created this to make else condition alert in restaurantLogin page
  // console.log(payload);
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

  if (payload.login) {
    //we can't use same API request twice for that we are making a condition if it is true it will proceed to login else signup
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true; //this is if inside of Login if
    }
  } else {
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true; //this is if inside of Login if
    }
  }

  return NextResponse.json({ result, success });
}
