import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const response = content.params.id;
  let success = false;
  //console.log(response); //checked if the params goind from browser is correct
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  let result = await foodSchema.find({ resto_id: response }); //finc with empty parameters show everything but when an object is inside it takes that value and filter
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
export async function DELETE(request, content) {
  const id = content.params.id;
  let success = false;
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  const result = await foodSchema.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    //it returns 2 things one is acknoweledged and deletedCount, we check here if its count is more than 0
    success = true;
  }

  return NextResponse.json({ result, success });
}
