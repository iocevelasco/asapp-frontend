import axios from 'axios';
import { ICity } from '../src/types/interface';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchCities = async (
  query: string,
): Promise<Record<string, any>> => {
  try {
    const { data } = await axios.get(
      `${baseURL}cities?filter=${query}&limit=20`,
    );

    return { result: data };
  } catch (err) {
    return [err];
  }
};

export const addToPreferenceUser = async (
  cityId: number,
  value: boolean,
): Promise<Record<string, any>> => {
  try {
    const payload = { [cityId]: value };
    const { data } = await axios.patch(`${baseURL}preferences/cities`, {
      ...payload,
    });

    return { result: data };
  } catch (err) {
    return [err];
  }
};

export const fetchPreferencesCities = async (): Promise<
  Record<string, any>
> => {
  try {
    const { data } = await axios.get(`${baseURL}preferences/cities`);
    return { result: data };
  } catch (err) {
    return [err];
  }
};
