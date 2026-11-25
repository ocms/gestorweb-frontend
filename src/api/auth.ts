import api, { obterCsrfToken } from "./axios";
import type { Usuario } from "../types/empresa";

interface LoginResponse {
  autenticado: boolean;
  usuario: Usuario;
}

export async function realizarLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "login/",
    { username, password },
    {
      headers: {
        "X-CSRFToken": obterCsrfToken(),
      },
    },
  );

  return response.data;
}

export async function realizarLogout(): Promise<void> {
  await api.post(
    "logout/",
    {},
    {
      headers: {
        "X-CSRFToken": obterCsrfToken(),
      },
    },
  );
}
