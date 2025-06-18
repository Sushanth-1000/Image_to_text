import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker, PSM, OEM } from 'tesseract.js';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isProcessingRef = useRef(false);

  const processImage = async (file: File) => {
    if (isProcessingRef.current) return;
    
    try {
      isProcessingRef.current = true;
      setIsProcessing(true);
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng', OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO,
      });
      const result = await worker.recognize(file);
      onResult(result.data.text);
      await worker.terminate();
    } catch (error) {
      console.error('Error processing image:', error);
      onResult('Error processing image. Please try again.');
    } finally {
      isProcessingRef.current = false;
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && !isProcessingRef.current) {
      processImage(files[0]);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !isProcessingRef.current) {
      processImage(acceptedFiles[0]);
    }
  }, [onResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false,
    disabled: isProcessing,
    noClick: true // Disable click on dropzone
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          disabled={isProcessing}
        >
          Select Image
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
        </Button>
      </Box>

      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        {isProcessing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress variant="indeterminate" />
            <Typography>Processing image...</Typography>
          </Box>
        ) : (
          <Typography>
            {isDragActive
              ? 'Drop the image here'
              : 'Or drag and drop an image file here'}
          </Typography>
        )}
      </DropzoneArea>
    </Box>
  );
};

export default FileUploader; 