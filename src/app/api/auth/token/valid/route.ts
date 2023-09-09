import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/auth/token/valid`)
    .then((res) => {
      return NextResponse.json({ result: res.data });
    })
    .catch((err: AxiosError) => {
      return NextResponse.json({ result: "NOT VALID" });
    });
}
