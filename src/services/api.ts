// import axios, { AxiosResponse } from "axios";

// axios.defaults.baseURL = "https://api.unsplash.com";
// const ACCESS_KEY = "A3nx2FXRqtZH1-4NqfORpOXAK1JQFT9rylzqShlpDlI";

// interface FetchImgResponse {
//   data: any;
// }

// export const getFetchImg = async (
//   page: number,
//   per_page: number,
//   query: string
// ): Promise<any> => {
//   const response: AxiosResponse<FetchImgResponse> = await axios.get(
//     "/search/photos",
//     {
//       params: {
//         client_id: ACCESS_KEY,
//         page: page,
//         per_page: per_page,
//         query: query,
//       },
//     }
//   );
//   return response.data;
// };
