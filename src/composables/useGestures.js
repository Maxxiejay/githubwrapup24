import { ref } from 'vue';

export function useGestures({ onPause, onNext, onPrevious }) {
    const isPaused = ref(false);

    // Mouse handlers for pause
    const handleMouseEnter = () => {
        isPaused.value = true;
        onPause?.();
    };

    const handleMouseLeave = () => {
        isPaused.value = false;
    };

    // Touch handlers for next/previous
    const handleTouchStart = (event) => {
        const touchX = event.touches[0].clientX;
        const targetWidth = event.target.clientWidth;

        isPaused.value = true;
        onPause?.();

        // Determine touch position: left or right
        if (touchX < targetWidth / 2) {
            // Left side
            onPrevious?.();
        } else {
            // Right side
            onNext?.();
        }
    };

    // Attach event listeners
    const addListeners = (element) => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('touchstart', handleTouchStart);
    };

    const removeListeners = (element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('touchstart', handleTouchStart);
    };

    return {
        isPaused,
        addListeners,
        removeListeners,
    };
}
