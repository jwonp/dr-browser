import axios, { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loginData = await request.json();

  return await axios
    .post(`${process.env.BACKEND_ENDPOINT}/user`, loginData)
    .then((res) => {
      return NextResponse.json({ result: "SUCCESS" });
    })
    .catch((err: AxiosError) => {
      return NextResponse.json({ result: "FAIL" });
    });
}
