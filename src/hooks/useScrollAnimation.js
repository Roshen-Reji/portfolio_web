// src/hooks/useScrollAnimation.js
import { useEffect, useState } from 'react';

/**
 * Calculates the scroll progress of a specific container relative to the viewport.
 * * @param {React.RefObject} targetRef - Ref to the scrollable container (e.g., stack-area)
 * @returns {number} progress - A value between 0 and 1 indicating scroll completion
 */
const useScrollAnimation = (targetRef) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!targetRef.current) return;

            const rect = targetRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate how much scrollable distance exists
            const scrollableDistance = rect.height - viewportHeight;

            // If the element fits in the screen, no scroll animation needed
            if (scrollableDistance <= 0) {
                setProgress(1);
                return;
            }

            // Calculate percentage based on top position
            // When rect.top is 0, we are at start. When rect.top is -scrollableDistance, we are at end.
            let percentage = -rect.top / scrollableDistance;

            // Clamp value between 0 and 1
            percentage = Math.max(0, Math.min(1, percentage));

            // Use requestAnimationFrame for smoother state updates
            requestAnimationFrame(() => {
                setProgress(percentage);
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [targetRef]);

    return progress;
};

export default useScrollAnimation;