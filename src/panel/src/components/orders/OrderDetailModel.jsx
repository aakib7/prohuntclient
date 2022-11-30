import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField,styled, Stack, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function OrderDetailModel() {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
    
  return (
    <div>
    
     
   
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <Box sx={style} maxWidth={'400px'}>
            <CloseIcon sx={{cursor:'pointer'}} onClick={() => {setOpen(false)}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display:'flex',justifyContent:'center'}}>
            Order Summery
          </Typography>
          <Divider/>
          <Box mt={2}> 
            <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography  fontWeight={400}>
            Owner Name:
          </Typography>
          <Typography>
           Aaqib
          </Typography>
          </Stack>
            
        </Box>


        <Box mt={2}> 
            <Stack direction={'row'}  justifyContent={'space-between'}>
          <Typography  fontWeight={500}>
            Delivery Time:
          </Typography>
          <Typography>
          5 days
          </Typography>
          </Stack>
            
        </Box>
        <Box mt={2}> 
            <Stack direction={'row'} spacing={4} justifyContent={'space-between'}>
          <Typography fontWeight={500}>
            Budet:
          </Typography>
          <Typography>
         $300
          </Typography>
          </Stack>
            
        </Box>
        <Box mt={2}> 
            <Stack direction={'row'} spacing={4} justifyContent={'space-between'}>
          <Typography  fontWeight={500}>
            Title:
          </Typography>
          <Typography>
          Design Responsive, SEO friendly & Fast Loading WordPress website
          </Typography>
          </Stack>
            
        </Box>
        <Box mt={2}>
            <Typography fontSize={18} fontWeight={500}>
                Description:
            </Typography>
            <Typography>Log onto All in the Wander here for more inspiration and advice from our friends in Vietnam and beyond.

Designer Tips: How To Create A Picture Perfect Photo Shoot

For the Traveler Of You

Ask Your Travel Doctor About Your Travel Health

For the Lovers

Vietnam’s Top Summer Island

</Typography>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}


const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;