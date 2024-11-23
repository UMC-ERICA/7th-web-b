import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/todo";

export const useFetchTodos = (searchQuery = "") => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          params: { title: searchQuery },
        });
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchTodos, 500); // Debounce 적용
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  return { todos, loading, error };
};
