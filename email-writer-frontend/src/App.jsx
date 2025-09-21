// import { useState } from "react";
// import "./App.css";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   FormControl,
//   Input,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// function App() {
//   const [emailContent, setEmailContent] = useState("");
//   const [tone, setTone] = useState("");
//   const [generatedReply, setGeneratedReply] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(
//         "http://localhost:9090/api/email/generate",
//         {
//           emailContent,
//           tone,
//         }
//       );
//       setGeneratedReply(
//         typeof response.data === "string"
//           ? response.data
//           : JSON.stringify(response.data)
//       );
//     } catch (error) {
//       setError("Failed to generate eamil reply. Please try again");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Email Reply Generator
//       </Typography>

//       <Box sx={{ mx: 3 }}>
//         <TextField
//           fullWidth
//           multiline
//           rows={6}
//           variant="outlined"
//           label="Original Email Content"
//           value={emailContent || ""}
//           onChange={(e) => setEmailContent(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Tone (Optional)</InputLabel>
//           <Select
//             value={tone || ""}
//             label={"Tone (Optional)"}
//             onChange={(e) => setTone(e.target.value)}
//           >
//             <MenuItem value="">None</MenuItem>
//             <MenuItem value="professional">Professional</MenuItem>
//             <MenuItem value="casual">Casual</MenuItem>
//             <MenuItem value="friendly">Friendly</MenuItem>
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={!emailContent || loading}
//           fullWidth
//         >
//           {loading ? <CircularProgress size={24} /> : "Generate Reply"}
//         </Button>
//       </Box>

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {generatedReply && (
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Generated Reply:
//           </Typography>
//           <TextField
//             fullWidth
//             multiline
//             rows={6}
//             variant="outlined"
//             value={generatedReply || ""}
//             inputProps={{ readOnly: true }}
//           />

//           <Button
//             variant="outlined"
//             sx={{ mt: 2 }}
//             onClick={() => navigator.clipboard.writeText(generatedReply)}
//           >
//             Copy to Clipboard
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// }

// export default App;

import { useState, useMemo } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

function App() {
  // Detect system theme preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  // MUI Theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  // States
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle API call
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:9090/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("⚠️ Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📧 Email Reply Assistant
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Input Card */}
        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              ✍️ Enter Email Content
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "✨ Generate Reply"}
            </Button>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Output Card */}
        {generatedReply && (
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ✅ Generated Reply
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={generatedReply}
                inputProps={{ readOnly: true }}
              />

              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                📋 Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
