import React, { createContext, useState, useContext, useEffect } from "react";

// Create Categories Context
const CategoriesContext = createContext();

// Create a provider component to manage state
export const CategoriesProvider = ({ children }) => {
  const [categories1, setCategories] = useState([]); // items state
  const [selectedCategory, setSelectedCategory] = useState(null); // selected category state

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    if (savedCategories) {
      setCategories(savedCategories); // Initialize from localStorage if available
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories1, setCategories, selectedCategory, setSelectedCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom hook to use the Categories Conte

export const useCategories = () => {
  return useContext(CategoriesContext);
};
