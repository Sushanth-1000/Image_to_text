import { useState } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import FileUploader from './components/FileUploader'
import ResultDisplay from './components/ResultDisplay'
import { createWorker } from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [ocrResult, setOcrResult] = useState<string>('');

  const handleOcrResult = (text: string) => {
    setOcrResult(text);
  };

  const processImage = async (file: File) => {
    try {
      const worker = await createWorker()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')

      let imageData: string
      if (file.type === 'application/pdf') {
        // Handle PDF
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 2.0 })
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: context!,
          viewport: viewport
        }).promise

        imageData = canvas.toDataURL('image/png')
      } else {
        // Handle image
        imageData = URL.createObjectURL(file)
      }

      const { data: { text } } = await worker.recognize(imageData)
      await worker.terminate()

      handleOcrResult(text)
    } catch (err) {
      console.error('Error processing image:', err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            OCR Web App
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Upload an image or PDF to extract text
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
