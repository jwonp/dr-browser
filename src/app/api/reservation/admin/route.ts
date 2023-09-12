import { HEADER_AUTHORIZATION, requsetWithJWT } from "@/util/request";
import axios, { AxiosError } from "axios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .get(`${process.env.BACKEND_ENDPOINT}/reservation/admin`)
    .then((res) => {
      return NextResponse.json([...res.data]);
    })
    .catch((err: AxiosError) => {
      return NextResponse.json([]);
    });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];
  const deleteId = searchParams.get("id");
  return await requsetWithJWT(jwt)
    .delete(`${process.env.BACKEND_ENDPOINT}/reservation/admin`, {
      data: { idList: [deleteId] },
    })
    .then((res) => {
      NextResponse.json({ isDeleted: true });
    })
    .catch((error) => {
      NextResponse.json({ isDeleted: false });
    });
}
export interface ReservationPatchProps {
  cardId?: string;
  userId?: string;
  roomId?: number;
}
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const reservationId = searchParams.get("id");
  const data: ReservationPatchProps = await request.json();
  const jwt = request.headers.get(HEADER_AUTHORIZATION).split(" ")[1];

  return await requsetWithJWT(jwt)
    .patch(
      `${process.env.BACKEND_ENDPOINT}/reservation?id=${reservationId}`,
      data
    )
    .then((res) => {
      return NextResponse.json({ isModified: true });
    })
    .catch((err: AxiosError) => {
      return NextResponse.json({ isModified: false });
    });
}
