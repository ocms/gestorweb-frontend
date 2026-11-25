import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { buscarHome } from "../api/home";
import type { HomeResponse } from "../types/empresa";

interface EmpresaContextType {
    dados: HomeResponse | null;
    carregando: boolean;
    erro: string | null;
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(
    undefined
);

export function EmpresaProvider({ children }: { children: ReactNode }) {
    const [dados, setDados] = useState<HomeResponse | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const resultado = await buscarHome();
                setDados(resultado);
            } catch (error) {
                console.error("Erro ao carregar dados da empresa:", error);
                setErro("Não foi possível carregar os dados do Gestorweb.");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    return (
        <EmpresaContext.Provider value={{ dados, carregando, erro }}>
            {children}
        </EmpresaContext.Provider>
    );
}

export function useEmpresa() {
    const context = useContext(EmpresaContext);

    if (!context) {
        throw new Error("useEmpresa deve ser utilizado dentro de EmpresaProvider");
    }

    return context;
}
