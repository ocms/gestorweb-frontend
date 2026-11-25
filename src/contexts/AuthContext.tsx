import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { realizarLogin, realizarLogout } from "../api/auth";
import { useEmpresa } from "./EmpresaContext";
import type { Usuario } from "../types/empresa";

interface AuthContextType {
  usuario: Usuario | null;
  autenticado: boolean;
  carregando: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { dados, carregando: carregandoEmpresa } = useEmpresa();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    if (!carregandoEmpresa && dados) {
      setUsuario(dados.usuario ?? null);
      setAutenticado(dados.autenticado);
    }
  }, [dados, carregandoEmpresa]);

  async function login(username: string, password: string) {
    const resultado = await realizarLogin(username, password);

    setUsuario(resultado.usuario);
    setAutenticado(true);
  }

  async function logout() {
    await realizarLogout();

    setUsuario(null);
    setAutenticado(false);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        carregando: carregandoEmpresa,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }

  return context;
}
