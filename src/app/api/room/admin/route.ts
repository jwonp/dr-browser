import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import axios, { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

    return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/room/admin`)
    .then((res) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err: AxiosError) => {
      return NextResponse.json([]);
    });
}
