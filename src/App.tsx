
import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  LoginOutlined,
  LocalTaxi,
  LogoutOutlined,
} from "@mui/icons-material";

// CONTEXTOS
import { useEmpresa } from "./contexts/EmpresaContext";
import { useAuth } from "./contexts/AuthContext";

// COMPONENTES
import Login from "./components/Login";

const drawerWidth = 250;

export default function App() {

  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Login");

  // DADOS DA EMPRESA
  const {
    dados,
    carregando: carregandoEmpresa,
    erro,
  } = useEmpresa();

  // AUTENTICAÇÃO
  const {
    usuario,
    autenticado,
    carregando: carregandoAuth,
    logout,
  } = useAuth();

  const empresa = dados?.empresa;

  // CARREGAMENTO
  const carregando = carregandoEmpresa || carregandoAuth;

  // LOGOUT
  async function handleLogout() {
    try {
      await logout();
      setSelected("Login");
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
    }
  }

  // MENU LATERAL
  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #142b4a 0%, #0c1e38 100%)",
        color: "#fff",
        position: "relative",
      }}
    >

      {/* IDENTIFICAÇÃO DA EMPRESA */}
      <Box
        sx={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          px: open ? 2 : 0,
          gap: 1.5,
          overflow: "hidden",
        }}
      >

        {empresa?.url_imagem ? (
          <Box
            component="img"
            src={empresa.url_imagem}
            alt="Logo da empresa"
            sx={{
              width: 38,
              height: 38,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        ) : (
          <LocalTaxi
            sx={{
              fontSize: 34,
              color: "#64b5f6",
              flexShrink: 0,
            }}
          />
        )}

        {open && (
          <Typography
            sx={{
              fontSize: 19,
              fontWeight: "bold",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            {empresa?.cooperativa || "Gestorweb"}
          </Typography>
        )}

      </Box>

      <Divider sx={{ borderColor: "#ffffff20" }} />

      {/* MENU */}
      <List sx={{ px: 1, py: 2 }}>

        {!autenticado && (
          <Tooltip
            title={!open ? "Login" : ""}
            placement="right"
            arrow
          >
            <ListItemButton
              selected={selected === "Login"}
              onClick={() => setSelected("Login")}
              sx={menuStyle}
            >
              <ListItemIcon sx={iconStyle}>
                <LoginOutlined />
              </ListItemIcon>

              {open && <ListItemText primary="Login" />}

            </ListItemButton>
          </Tooltip>
        )}

      </List>

      {/* RODAPÉ */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: 0,
          px: 2,
        }}
      >
        {open && (
          <Typography variant="caption" color="#8fa6c2">
            Gestorweb {dados?.versao ? `v${dados.versao}` : ""}
          </Typography>
        )}
      </Box>

    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f3f6fa",
      }}
    >

      {/* BARRA SUPERIOR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #0753a5 0%, #1264bd 100%)",
          color: "#fff",
          boxShadow: "0 2px 8px #102b4a25",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>

          <IconButton
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            sx={{
              ml: 2,
              flexGrow: 1,
              fontWeight: "bold",
            }}
          >
            {empresa?.cooperativa || "Gestorweb"}
          </Typography>

          {/* USUÁRIO AUTENTICADO */}
          {autenticado && (
            <>
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {usuario?.nome}
              </Typography>

              <Button
                color="inherit"
                startIcon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          )}

        </Toolbar>
      </AppBar>

      {/* MENU LATERAL */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 72,
            boxSizing: "border-box",
            border: 0,
            transition: "width 0.2s",
            overflowX: "hidden",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* ÁREA CENTRAL */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: "100vh",
          bgcolor: "#f4f7fb",
        }}
      >

        <Toolbar />

        <Box
          sx={{
            height: "calc(100vh - 64px)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >

          {/* CARREGAMENTO */}
          {carregando ? (
            <CircularProgress />

          ) : erro ? (
            <Typography color="error">
              {erro}
            </Typography>

          ) : !autenticado ? (

            /* TELA DE LOGIN */
            <Login />

          ) : (

            /* ÁREA DO SISTEMA */
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >

              <Typography
                variant="h5"
                sx={{fontWeight:"bold"}}
                color="#142b4a"
              >
                Bem-vindo, {usuario?.nome}!
              </Typography>

              <Box
                component="img"
                src="/imagens/quicksys_1024.png"
                alt="Gestorweb"
                sx={{
                  width: "100%",
                  height: "85%",
                  objectFit: "contain",
                  display: "block",
                }}
              />

            </Box>
          )}

        </Box>

      </Box>

    </Box>
  );
}

// ESTILOS DO MENU
const menuStyle = {
  color: "#e1eaf5",
  borderRadius: 0,
  mb: 0.5,
  minHeight: 46,

  "&.Mui-selected": {
    bgcolor: "#075bb5",
    color: "#fff",
    borderLeft: "4px solid #65c5ff",

    "&:hover": {
      bgcolor: "#0868c9",
    },
  },

  "&:hover": {
    bgcolor: "#ffffff15",
  },
};

const iconStyle = {
  color: "inherit",
  minWidth: 40,
};
