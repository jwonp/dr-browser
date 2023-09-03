import { RoomSelectCardItem } from "@/assets/DataCard/templates/RoomSelectCard/RoomSelectCard";
import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import { AxiosResponse } from "axios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/room/select`)
    .then((res: AxiosResponse<RoomSelectCardItem[], any>) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err) => {
      return NextResponse.json([]);
    });
}
