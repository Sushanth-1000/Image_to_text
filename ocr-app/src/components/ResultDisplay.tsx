import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface ResultDisplayProps {
  text: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ text }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Extracted Text
      </Typography>
      <Box
        sx={{
          backgroundColor: 'background.default',
          p: 2,
          borderRadius: 1,
          maxHeight: '400px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Paper>
  );
};

export default ResultDisplay; 