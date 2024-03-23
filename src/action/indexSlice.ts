import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AllCards,
  CreateCards,
  DeleteCards,
  EditCards,
  FetchImages,
} from "@/services";
import { RootState } from "@/store/store";
import { ImagesProps } from "@/components/ProjectAdd";

// Define initial state
const initialState = {
  status: "idle",
  images: [],
  AllCards: [],
  error: null,
};

// Define async thunks with error handling
export const FetchImagesAsync = createAsyncThunk(
  "index/images",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchImages();
      return response; // Adjust this line based on the actual structure of the response
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const AllCardsAsync = createAsyncThunk(
  "index/data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AllCards();
      return response.result; // Adjust this line based on the actual structure of the response
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const CreateCardsAsync = createAsyncThunk(
  "index/create",
  async (CardData: ImagesProps, { rejectWithValue }) => {
    try {
      const response = await CreateCards(CardData);
      return response; // Adjust this line based on the actual structure of the response
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const EditCardsAsync = createAsyncThunk(
  "index/Edit",
  async (CardData: ImagesProps, { rejectWithValue }) => {
    try {
      const response = await EditCards(CardData);
      return response; // Adjust this line based on the actual structure of the response
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const DeleteCardsAsync = createAsyncThunk(
  "index/delete",
  async (CardId: any, { rejectWithValue }) => {
    try {
      const response = await DeleteCards(CardId);
      return response; // Adjust this line based on the actual structure of the response
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
// Define slice
export const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      })
      .addCase(AllCardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AllCardsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllCards = action.payload;
      })
      .addCase(CreateCardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateCardsAsync.fulfilled, (state: any, action) => {
        state.status = "idle";
        state.AllCards.push(action.payload);
      })
      .addCase(DeleteCardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteCardsAsync.fulfilled, (state: any, action) => {
        state.status = "idle";
        state.AllCards = state.AllCards.filter(
          (card: any) => card._id !== action.payload._id
        );
      })
      .addCase(EditCardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditCardsAsync.fulfilled, (state: any, action) => {
        state.status = "idle";
        const { _id, data } = action.payload;

        // Find the index of the card in state.AllCards based on its _ID
        const existingCardIndex = state.AllCards.findIndex(
          (card: any) => card._id === _id
        );

        if (existingCardIndex !== -1) {
          // Merge action.payload.data with the existing card's data
          state.AllCards[existingCardIndex] = {
            ...state.AllCards[existingCardIndex],
            ...data,
          };
        }
      });
  },
});

// Export actions
export const selectImages = (state: RootState) => state.index.images;
export const selectAllCards = (state: RootState) => state.index.AllCards;

// Export reducer
export default indexSlice.reducer;
