import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import { AxiosError } from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/card/admin`)
    .then((res) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err: AxiosError) => {
      return NextResponse.json([]);
    });
}

export async function DELETE(request: NextRequest) {
  
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  const res = await requsetWithJWT(jwt).delete(
    `${process.env.BACKEND_ENDPOINT}/card`,
    { data: { idList: [cardId] } }
  );
}
