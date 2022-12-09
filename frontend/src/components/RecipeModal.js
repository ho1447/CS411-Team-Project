import React from 'react';
import { Typography, Modal, Box, Button } from '@mui/material';
import axios from 'axios';

const RecipeModal = ({
  openModal,
  setOpenModal,
  setCurrentRecipe,
  currentRecipe,
  token,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setCurrentRecipe({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {currentRecipe.title}
        </Typography>
        <img src={currentRecipe.linkToImage} alt="oops" />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <div dangerouslySetInnerHTML={{ __html: currentRecipe.summary }} />
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(
                `http://localhost:8080/api/v1/save/${token}/${currentRecipe.recipeID}`
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default RecipeModal;
