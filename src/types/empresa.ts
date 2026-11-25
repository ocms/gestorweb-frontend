export interface Empresa {
  id: number;
  lat_lng_centromapa: string;
  bandeirada: number;
  valor_bandeira_1: number;
  valor_bandeira_2: number;
  cooperativa: string;
  url_imagem: string;
  url_site: string;
  url_foto: string;
  servidor_primario: string;
}

export interface Usuario {
  id: number;
  nome: string;
  username: string;
  superuser: boolean;
}

export interface HomeResponse {
  empresa: Empresa;
  versao: string;
  autenticado: boolean;
  usuario?: Usuario;
}
