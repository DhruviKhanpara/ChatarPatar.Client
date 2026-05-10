import { MyDetailDTO } from "@/types/user";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyDetails: build.query<MyDetailDTO, void>({
            query: () => "/user/me",
            // providesTags: ["Me"],
        }),
    }),
});

export const {useGetMyDetailsQuery} = userApi;