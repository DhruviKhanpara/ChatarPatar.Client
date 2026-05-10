import { baseApi } from "./baseApi";
import type {
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      // invalidatesTags: ["User"],
    }),

     register: build.mutation<void, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      // invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
