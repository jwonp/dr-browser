import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import axios, { AxiosError } from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/card/admin/lost`)
    .then((res) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err: AxiosError) => {
      return NextResponse.json([]);
    });
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
