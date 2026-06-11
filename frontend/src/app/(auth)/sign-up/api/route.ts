import Axios from "@/config/axios/Axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiAddr = "/auth/register";
  const body = await req.json();

  const bodyData = {
    name: body.name,
    email: body.email,
    password: body.password,
  };

  try {
    const res = await Axios.post(apiAddr, bodyData);
    const data = res.data;

    const response = NextResponse.json(data);

    response.cookies.set("token", data?.data?.token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error during sign-up", axiosError.message);
    const statusCode = axiosError.response?.status || 500;
    const errorMessage = axiosError.response?.data || {
      error: "An error occurred during sign-up",
    };
    return NextResponse.json(errorMessage, { status: statusCode });
  }
}
