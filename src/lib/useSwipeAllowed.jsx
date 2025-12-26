import { useState, useEffect } from "react";

const useSwipeAllowed = (width) => {
    const [isSwipe, setIsSwipe] = useState(false);

    useEffect(() => {
        const update = () => setIsSwipe(window.innerWidth < width);

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, [width]);
    
    return { isSwipe };
}

export default useSwipeAllowed;