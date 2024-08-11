import axios from "axios";
import { useEffect, useState, useRef } from "react";

axios.defaults.baseURL = "https://opentdb.com";

const useAxios = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const requestInProgress = useRef(false); 

  useEffect(() => {
    const fetchData = () => {
      if (requestInProgress.current) return; 

      requestInProgress.current = true;
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setResponse(res.data);
          setError(""); 
        })
        .catch(err => {
          if (err.response && err.response.status === 429) {
            setError('Too Many Requests: Please try again later.');
            
          } else {
            setError('An error occurred.');
          }
        })
        .finally(() => {
          setLoading(false);
          requestInProgress.current = false; 
        });
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useAxios;
