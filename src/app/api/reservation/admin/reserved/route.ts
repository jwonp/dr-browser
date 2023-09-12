import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import axios, { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/reservation/admin/reserved`)
    .then((res) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err: AxiosError) => {
      return NextResponse.json([]);
    });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .delete(`${process.env.BACKEND_ENDPOINT}/reservation/admin/reserved`, {
      data: { requestId: requestId },
    })
    .then((res) => {
      return NextResponse.json({isDeleted:true});
    })
    .catch((err: AxiosError) => {
      return NextResponse.json({isDeleted:false});
    });
}
