import { useState } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import FileUploader from './components/FileUploader'
import ResultDisplay from './components/ResultDisplay'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  const [ocrResult, setOcrResult] = useState<string>('');

  const handleOcrResult = (text: string) => {
    setOcrResult(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 1
        }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            OCR Web App
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph align="center">
            Upload an image to extract text
          </Typography>
          
          <FileUploader onResult={handleOcrResult} />
          
          {ocrResult && (
            <Box sx={{ mt: 4 }}>
              <ResultDisplay text={ocrResult} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App 