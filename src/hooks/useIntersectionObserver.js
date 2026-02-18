import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (ids, offset = 0) => {
    const [activeId, setActiveId] = useState('');
    const observers = useRef([]);

    useEffect(() => {
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    setActiveId(entry.target.id);
                }
            });
        };

        // Cleanup previous observers
        observers.current.forEach((observer) => observer.disconnect());
        observers.current = [];

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(handleIntersect, {
                    rootMargin: `-${offset}px 0px -50% 0px`,
                    threshold: 0.5,
                });
                observer.observe(element);
                observers.current.push(observer);
            }
        });

        return () => {
            observers.current.forEach((observer) => observer.disconnect());
        };
    }, [ids, offset]);

    return activeId;
};
