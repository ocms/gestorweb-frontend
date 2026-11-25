import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  PersonOutlined,
  LockOutlined,
  LoginOutlined,
} from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErro("");
    setEnviando(true);

    try {
      await login(username, password);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.erro || "Não foi possível realizar o login.";

      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 30px #102b4a12",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 3,
                bgcolor: "#e8f2fc",
                color: "#0753a5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LoginOutlined sx={{ fontSize: 32 }} />
            </Box>

            <Typography variant="h5" sx={{fontWeight: "bold"}} color="#142b4a">
              Bem-vindo
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Entre com suas credenciais
            </Typography>
          </Box>

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
              autoFocus
              required
              disabled={enviando}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              autoComplete="current-password"
              required
              disabled={enviando}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={enviando}
              sx={{
                mt: 3,
                py: 1.4,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0753a5 0%, #1264bd 100%)",
                "&:hover": {
                  background: "#06458b",
                },
              }}
            >
              {enviando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "ENTRAR"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
