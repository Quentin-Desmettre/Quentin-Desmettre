import { useEffect } from "react";

const useMount = (ref, callback) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        });

        observer.observe(ref.current);

        // Cleanup the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, []);
}

export default useMount;
