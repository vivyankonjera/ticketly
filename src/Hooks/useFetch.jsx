import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Sorry, something went wrong! :(");
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                });

            setIsLoading(false);
        }, 200);
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
