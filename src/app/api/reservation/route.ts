import { ReservationDetail } from "@/app/reservation/page";
import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import { AxiosError, AxiosResponse } from "axios";
import { NextResponse } from "next/server";

interface ReservationWithoutAddress extends ReservationDetail {}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reservationId = searchParams.get("id");
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];
  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/reservation?id=${reservationId}`)
    .then((res: AxiosResponse<ReservationWithoutAddress, any>) => {
      console.log(res.data);
      return NextResponse.json(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err.status);
      return NextResponse.json({
        reservationId: 0,
        createdTime: "",
        name: "",
        phone: "",
        address: "",
      });
    });
}
