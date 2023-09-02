import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  const res = await requsetWithJWT(jwt).get(
    `${process.env.BACKEND_ENDPOINT}/card/index?id=${userId}`
  );
  if (res.status !== 200) {
    console.log(res.status);
    return NextResponse.json([]);
  }
  const data = await res.data;

  return NextResponse.json(data);
}
