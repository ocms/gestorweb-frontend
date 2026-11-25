import api from "./axios";
import type { HomeResponse } from "../types/empresa";

export async function buscarHome(): Promise<HomeResponse> {
  const response = await api.get<HomeResponse>("home/");
  return response.data;
}
