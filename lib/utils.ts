import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const Api = axios.create({ baseURL: 'https://backend-pkl.up.railway.app/api/v1', });
