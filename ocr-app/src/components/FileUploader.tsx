import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface FileUploaderProps {
  onResult: (text: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onResult }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      setProgress(0);

      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const result = await worker.recognize(file);
      onResult(result.data.text);
      
      await worker.terminate();
    } catch (error) {
      console.error('Error processing image:', error);
      onResult('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processImage(acceptedFiles[0]);
    }
  }, [onResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        {isProcessing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress variant="determinate" value={progress} />
            <Typography>Processing image...</Typography>
          </Box>
        ) : (
          <Typography>
            {isDragActive
              ? 'Drop the file here'
              : 'Drag and drop an image or PDF file here, or click to select'}
          </Typography>
        )}
      </DropzoneArea>
    </Box>
  );
};

export default FileUploader; 