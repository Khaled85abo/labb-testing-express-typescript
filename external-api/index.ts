import axios from "axios";
import { GeoCoor } from "../types/geoCoor";

export const getGeoCoor = async (country: string, city: string) => {
  let options = {
    method: "GET",
    headers: { "x-api-key": process.env.NINJA_API_KEY },
  };

  let url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`;

  const { data } = await axios.get<GeoCoor[]>(url, options);
  return data;
};
