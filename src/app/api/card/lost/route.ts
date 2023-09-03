import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("post");
  const lostCardId = await request.json();
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  const res = await requsetWithJWT(jwt).post(
    `${process.env.BACKEND_ENDPOINT}/card/lost`,
    lostCardId
  );
  if (res.status !== 200) {
    console.log(res.status);
    return NextResponse.json({});
  }
  const data = await res.data;

  return NextResponse.json(data);
}
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lostCardId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  const res = await requsetWithJWT(jwt).delete(
    `${process.env.BACKEND_ENDPOINT}/card/lost`,
    { data: { cardId: lostCardId } }
  );
  if (res.status !== 200) {
    console.log(res.status);
    return NextResponse.json({ result: "fail" });
  }
  const data = await res.data;

  return NextResponse.json({ result: res.data });
}
