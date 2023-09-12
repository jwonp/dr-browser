import { ReservationDetail } from "@/app/reservation/page";
import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];
  return await requsetWithJWT(jwt)
    .post(`${process.env.BACKEND_ENDPOINT}/reservation/request`, data)
    .then((res: AxiosResponse<boolean, any>) => {
      return NextResponse.json({ isSaved: res.data });
    })
    .catch((err: AxiosError) => {
      console.log(err.status);
      return NextResponse.json({ isSaved: false });
    });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];
  return await requsetWithJWT(jwt)
    .delete(`${process.env.BACKEND_ENDPOINT}/reservation/request`, {
      data: { requestId: requestId },
    })
    .then((res) => {
      return NextResponse.json({ result: res.data });
    })
    .catch((err: AxiosError) => {
      console.log(err.status);
      return NextResponse.json({ result: false });
    });
}
