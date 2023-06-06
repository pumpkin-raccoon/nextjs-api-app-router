import dbConnect from "@/libs/api/dbConnect";
import { PostModel } from "@/libs/api/models/post";
import { NextRequest, NextResponse } from "next/server";

const getPostOrder = (orderBy?: string): { createdAt: 1 | -1 } => {
  switch (orderBy) {
    case 'CREATED_AT_ASC':
      return { createdAt: 1 }
    case 'CREATED_AT_DESC':
    default:
      return { createdAt: -1 }
  }
}

export async function GET(req: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const orderBy = searchParams.get('orderBy') || undefined
  const filter = {}
  const category = searchParams.get('category') || undefined
  if (category) {
    Object.assign(filter, { category })
  }
  const posts = await PostModel
    .find(filter)
    .sort(getPostOrder(orderBy))

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const body = await req.json();
  const post = await PostModel.create(body.input)

  return NextResponse.json(post);
}
