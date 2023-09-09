import { useEffect } from "react";

const useMount = (reference, onMount, onUnmount = () => {}) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onMount();
                } else
                    onUnmount()
            });
        });

        observer.observe(reference.current);

        // Cleanup the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [reference, onMount, onUnmount]);
}

export default useMount;
