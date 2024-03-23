import { ImagesProps } from "@/components/ProjectAdd";
import axios from "axios";

export async function FetchImages() {
  try {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=1&limit=10"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return error;
  }
}

export async function AllCards() {
  try {
    const response = await axios.get("https://necoleo-be.vercel.app/");
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return error;
  }
}

export async function CreateCards(CardData: any) {
  try {
    const response = await axios.post(
      "https://necoleo-be.vercel.app/",
      CardData
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching images:", error);
    return error;
  }
}

export async function DeleteCards(CardId: any) {
  try {
    const response = await axios.delete(
      `https://necoleo-be.vercel.app/delete/${CardId}`
    );
    console.log(response.data); // Log the response data
    return response.data.result; // Return the response data
  } catch (error: any) {
    console.error("Error deleting card:", error);
  }
}

export async function EditCards(CardData: ImagesProps) {
  try {
    const response = await axios.patch(
      "https://necoleo-be.vercel.app/update/" + CardData._id,
      CardData
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching images:", error);
    return error;
  }
}
