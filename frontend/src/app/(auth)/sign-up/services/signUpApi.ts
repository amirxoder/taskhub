import { ResponseType } from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignUpResponseInterface,
  SignUpRequestInterface,
} from "../types/signUp";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: (build) => ({
    register: build.mutation<
      ResponseType<SignUpResponseInterface>,
      SignUpRequestInterface
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = signUpApi;
