import { useState, useEffect } from "react";

const useSearchTerm = (key: string, initialValue: string = "") => {
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedTerm = localStorage.getItem(key);
    return savedTerm !== null ? savedTerm : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchTerm);
    };
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
