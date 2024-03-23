"use client";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ImagesProps, useAppDispatch } from "./ProjectAdd";
import Image from "next/image";
import { DeleteCardsAsync, EditCardsAsync } from "@/action/indexSlice";

interface cardProps extends ImagesProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const Card = ({
  createdAt,
  _id,
  author,
  download_url,
  id,
  url,
  updatedAt,
}: cardProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenEditModal = () => {
    setEditModal(true);
    handleClose();
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
    handleClose();
  };

  const handleDelete = (cardId: any) => {
    dispatch(DeleteCardsAsync(cardId));
    handleClose();
  };
  const Format = (date: Date) => {
    const formattedCreatedAt = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return formattedCreatedAt;
  };

  // State to hold form data
  const [formData, setFormData] = React.useState({
    author,
    download_url,
    id,
    url,
  });

  // Handler for input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateForm: ImagesProps = { _id, ...formData };
    dispatch(EditCardsAsync(updateForm));
    // Here you can handle the submission, e.g., send the data to a server
  };

  return (
    <>
      {" "}
      <Box
        className=" flex items-center justify-center lg:w-[404px] md:w-fit w-full h-auto flex-col "
        key={id}
      >
        <Box className="w-[130px] h-[130px] relative md:w-[360px] md:h-[180px] lg:w-[360px] lg:h-[180px] text-white flex justify-center rounded-lg items-center">
          <Button onClick={handleOpenModal} className="w-full h-full">
            <Image
              className="rounded-lg"
              src={download_url}
              alt={_id}
              layout="fill" // Corrected from 'fill' to 'layout="fill"'
            />
          </Button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Card Details
              </Typography>
              <Divider variant="fullWidth" />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Box>Card no. {id}</Box>
                <Box>Author Name : {author}</Box>
                <Box>URL : {url}</Box>
                <Box>Download URL : {download_url}</Box>
                <Box>Created At : {Format(new Date(createdAt))}</Box>
                <Box>Updated At : {Format(new Date(updatedAt))}</Box>
              </Typography>
            </Box>
          </Modal>
          <IconButton
            className="w-fit h-fit text-white absolute top-1 right-0"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert className="" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(_id)}>Delete</MenuItem>
          </Menu>
          <Modal
            open={editModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Form
              </Typography>
              <Divider variant="fullWidth" />
              <FormControl component="form" onSubmit={handleSubmit}>
                <TextField
                  label="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Download Url"
                  name="download_url"
                  value={formData.download_url}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  label="Card no."
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  //   onClick={handleCloseEditModal}
                  variant="outlined"
                  color="primary"
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          </Modal>
        </Box>
        <Box className="lg:text-lg md:text-lg text-normal my-2 font-semibold">
          By {author}
        </Box>
        <Box className=" text-xs opacity-35">
          <Box>Last Updated : {Format(new Date(updatedAt))}</Box>
        </Box>
      </Box>
    </>
  );
};

export default Card;
