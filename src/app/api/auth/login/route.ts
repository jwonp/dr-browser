import axios, { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loginData = await request.json();

  return await axios
    .post(`${process.env.BACKEND_ENDPOINT}/auth/login`, loginData)
    .then((res) => {
      return NextResponse.json({ jwt: res.data });
    })
    .catch((err: AxiosError) => {
      return NextResponse.json({ status: err.status });
    });
}
