import { useState, useEffect } from "react";
import axios from 'axios'

const useAxiosFetch = (dataUrl) =>{
    const [data, setData]=useState([])
    const [fetchError,setFetchError] = useState(null)
    const [isLoading, setIsLoading] =useState(false);

    useEffect(()=> {
        let isMounted = true;
        const source = axios.CancelToken.source();//source now holds an object with two properties, token and cancel.

        const fetchData = async (url)=>{
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken : source.token//The cancelToken: source.token line attaches the cancel token to the request.
                });
                if (isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            } catch(err){
                if (isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            } finally{
                isMounted && setIsLoading(false)         
            }
            
        }

        fetchData(dataUrl);

        const cleanUp = ()=>{
            isMounted = false;
            source.cancel(); // cancel the request
        }
        return cleanUp;
    }, [dataUrl]);

    return {data, fetchError, isLoading}

}

export default useAxiosFetch;