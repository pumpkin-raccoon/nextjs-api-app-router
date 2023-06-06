import dbConnect from "@/libs/api/dbConnect";
import { PostModel } from "@/libs/api/models/post";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {
  params,
}: {
  params: { postId: string };
},) {
  await dbConnect()
  const post = await PostModel.aggregate([
    {
      '$match': {
        '_id': new Types.ObjectId(params.postId)
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'writerId', 
        'foreignField': '_id', 
        'as': 'writer'
      }
    }, {
      '$unwind': {
        'path': '$writer'
      }
    }
  ]).limit(1)

  return NextResponse.json(post?.[0]);
}

export async function POST(req: NextRequest, {
  params,
}: {
  params: { postId: string };
},) {
  await dbConnect()
  const body = await req.json();
  const post = await PostModel.findByIdAndUpdate(
    params.postId,
    body.input,
    { new: true }
  )

  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, {
  params,
}: {
  params: { postId: string };
},) {
  await dbConnect()
  const post = await PostModel.findByIdAndDelete(params.postId)

  return NextResponse.json(post);
}
