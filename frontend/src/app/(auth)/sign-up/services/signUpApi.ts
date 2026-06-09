import { ResponseType } from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignUpResponseInterface,
  SignUpRequestInterface,
} from "../types/signUp";

const baseUrl = process.env.NEXT_PUBLIC_APP_GATEWAY;

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    register: build.mutation<
      ResponseType<SignUpResponseInterface>,
      SignUpRequestInterface
    >({
      query: (body) => ({
        url: "/sign-up/api",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = signUpApi;
