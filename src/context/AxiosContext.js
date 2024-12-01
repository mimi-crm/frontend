import React, { createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const AxiosContext = createContext(axiosInstance);

export const useAxios = () => {
  return useContext(AxiosContext);
};

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};
