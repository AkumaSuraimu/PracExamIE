import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';

function PrelimPrac() {  
    const [gridValues] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [zeroPosition, setZeroPosition] = useState(null); 
    const [rolling, setRolling] = useState(false); 
    const [upperDisplay, setUpperDisplay] = useState(Array(9).fill(0)); //mao ning mga array of zero ubos sa upper display or sa 1 to 9
    const rollInterval = useRef(null); 
    const [lastStoppedPosition, setLastStoppedPosition] = useState(null); //Tig track ni sa last number sa zero ni land
  
    //tig start nis zero mag balhin2 randomly
    const startRoll = () => {
      rollInterval.current = setInterval(() => {
        const newPosition = Math.floor(Math.random() * 9); 
        setZeroPosition(newPosition); 
      }, 300); 
    };

    //kani tig stop
    const stopRoll = () => {
      if (rollInterval.current) {
        clearInterval(rollInterval.current); 
        rollInterval.current = null;
        setLastStoppedPosition(zeroPosition); // diri ma gamit and value sa usestate sa zero position
      }
    };
  
    const toggleRoll = () => {
      if (!rolling) {
        if (lastStoppedPosition !== null) {//tig increment nis 0 sa last position niya ge stop
          const updatedDisplay = [...upperDisplay];
          updatedDisplay[lastStoppedPosition]++; 
          setUpperDisplay(updatedDisplay);
        }
        setRolling(true);
        startRoll();
      } else {
        setRolling(false);
        stopRoll(); 
      }
    };
  
    useEffect(() => {
      return () => clearInterval(rollInterval.current); 
    }, []);
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        {/* Upper Display Box */}
        <Grid container spacing={2} justifyContent="center">
          {gridValues.map((item, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>{item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* Below Display Box */}
        <Grid container spacing={2} justifyContent="center">
          {upperDisplay.map((item, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>{item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* grid 1 to 9 */}
        <Grid container spacing={2} justifyContent="center" sx={{ width: 300 }}>
          {gridValues.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  border: '1px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: zeroPosition === index ? '#ffa726' : '#154c79',
                }}
              >
                <Typography>{zeroPosition === index ? 0 : item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* Start/Stop Roll Button */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Button
            variant="contained"
            color={rolling ? 'secondary' : 'primary'} 
            onClick={toggleRoll}
          >
            {rolling ? 'STOP ROLL' : 'START ROLL'}
          </Button>
        </Box>
      </Box>
    );
}

export default PrelimPrac;
