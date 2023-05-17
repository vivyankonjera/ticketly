import {useState, useEffect} from 'react'; 

const useFetch = (url) => {
    let [isLoading, setIsLoading] = useState(true);
    let [data, setData] = useState([]);
    let [error, setError] = useState(null);
    useEffect(() => {
        setTimeout(() => {
    
        const res = fetch(url)
        .then(res => {

            if (!res.ok){
                throw Error("Sorry, something went wrong! :(")
                }
            return res.json();
        })
        .then(data => {
            setData(data);
            setError(null);
        })
        .catch(err => setError(err.message))
        
        
        setIsLoading(false)
          
        }, 1000);
      }, [url])

      return {data, isLoading, error};
}

export default useFetch; 