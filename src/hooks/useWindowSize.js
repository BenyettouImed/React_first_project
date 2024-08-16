import {useState, useEffect} from 'react';

const useWindowSize = ()=>{
    const [windowSize, setWindowSize] = useState({
        width : undefined,
        height : undefined
    })

    useEffect(()=>{
        const handleResize = ()=>{
            setWindowSize({
                width : window.innerWidth,
                height : window.innerHeight
            })
        }
        handleResize();//to get initiale values
        window.addEventListener('resize', handleResize)// whenever the screen is resized

        

        return ()=> window.removeEventListener('resize',handleResize); // clean up. it prevents a memory leak
    }, [])

    return windowSize
}

export default useWindowSize;
