import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  //v23 created to get the fields of foodlist for updating
  const id = content.params.id;
  let success = false;
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  const result = await foodSchema.findOne({ _id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function PUT(request, content) {
  const id = content.params.id;
  const payload = await request.json(); //what we send payload we need to convert into json
  let success = false;
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  const result = await foodSchema.findOneAndUpdate({ _id: id }, payload); //it takes 2 parameters one is which id to updated and with what to update
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
