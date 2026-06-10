export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_URL = import.meta.env.VITE_API_URL;

export const cityProvide = Symbol("city");

export const errorMap = new Map([[1006, "Указанный город не найден"]]);
