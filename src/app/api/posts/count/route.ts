import dbConnect from "@/libs/api/dbConnect"
import { PostModel } from "@/libs/api/models/post"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const filter = {}
  const category = searchParams.get('category') || undefined
  if (category) {
    Object.assign(filter, { category })
  }
  const count = await PostModel
    .find(filter)
    .countDocuments()

  return NextResponse.json({ count });
}
