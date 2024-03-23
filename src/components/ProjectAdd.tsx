"use client";
import {
  AllCardsAsync,
  CreateCardsAsync,
  FetchImagesAsync,
  selectAllCards,
  selectImages,
} from "@/action/indexSlice";
import { AllCards, FetchImages } from "@/services";
import { AppDispatch, RootState } from "@/store/store";
import { AddBox, MoreVert } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Card from "./Card";

// Create a typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export interface ImagesProps {
  id: string;
  _id?: any;
  author?: string;
  width?: number;
  height?: number;
  url?: string;
  download_url?: any;
  createdAt?: any;
  updatedAt?: any;
}

// Correctly type useState for cards as an array of ImagesProps

const ProjectAdd: React.FC = () => {
  const [cards, setCards] = useState<ImagesProps[]>([]);
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);

  const addCard = () => {
    const image = [...images];
    const randomIndex = Math.floor(Math.random() * image.length);
    const randomImage = image[randomIndex];
    setCards((prevCards) => [...prevCards, randomImage]); // Correctly append new card to the array
    dispatch(CreateCardsAsync(randomImage)); // Dispatch the action to fetch images
  };
  const AllCardData = useAppSelector(selectAllCards);

  useEffect(() => {
    dispatch(FetchImagesAsync()); // Dispatch the action to fetch images
    dispatch(AllCardsAsync()); // Dispatch the action to fetch images
  }, [dispatch]);

  return (
    <Box className="w-full">
      <Box className="lg:text-4xl md:text-4xl text-xl font-semibold ml-5">
        My Projects
      </Box>
      <Box className="grid lg:grid-cols-4 grid-cols-2  justify-center items-center gap-5">
        {/* Add Card */}
        <Box className="my-5 col-span-1 flex lg:w-fit md:w-fit w-full h-auto flex-col items-center text-center ml-4 justify-center">
          <Button
            onClick={addCard}
            className="w-fit md:w-[360px] md:h-[180px] lg:w-[360px] lg:h-[180px] hover:bg-[#FA782F66]/15 bg-[#FA782F66] text-white flex justify-center rounded-lg items-center"
          >
            <AddBox className="h-10 w-10 m-10" />
          </Button>
          <Box className="lg:text-xl md:text-xl text-normal my-2 font-semibold">
            Create a new project
          </Box>
          <Box className="sm:text-sm lg:text-sm text-xs flex font-semibold">
            or Try a<Box className="text-[#FA782F]">Sample Projects</Box>
          </Box>
        </Box>
        {AllCardData ? (
          AllCardData?.map((data: ImagesProps) => (
            <Box
              key={data._id}
              className="flex items-center justify-center col-span-1"
            >
              <Card
              key={data._id}
                author={data.author}
                download_url={data.download_url}
                url={data.url}
                id={data.id}
                _id={data._id}
                createdAt={data.createdAt}
                updatedAt={data.updatedAt}
              />
            </Box>
          ))
        ) : (
          <Box>
            <Box className="flex flex-row gap-2">
              <Box className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></Box>
              <Box className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></Box>
              <Box className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectAdd;
