import { useEffect } from "react";

const useMount = (reference, callback) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        });

        observer.observe(reference.current);

        // Cleanup the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [reference, callback]);
}

export default useMount;
