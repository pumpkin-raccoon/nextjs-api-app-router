import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("부트캠프 API입니다!");
}

export async function POST() {
  return NextResponse.json('POST 요청입니다.')
}
