<template>
    <div id="status-counter">
        <div class="status-bars">
            <div
                class="status-bar"
                v-for="index in totalStatusNo"
                :key="index"
                :class="{ active: index <= currentStatus, 'animate': index === currentStatus }"
                :style="getAnimationStyle(index)"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';

const props = defineProps({
    currentStatus: Number,
    totalStatusNo: Number,
    paused: Boolean,
});

const animationKeys = ref([]);

const updateAnimationKeys = () => {
    // Generate a unique key for each status to re-trigger animation
    animationKeys.value = Array.from({ length: props.totalStatusNo }, () => Math.random());
};

const pauseAnimation = () => {
    // Pause the animation
    document.styleSheets[0].insertRule('.status-bar.animate::after { animation-play-state: paused; }', 0);
};

// Update animation keys whenever the current status changes
watch(() => props.currentStatus, updateAnimationKeys, { immediate: true });
watch(() => props.paused, pauseAnimation, { immediate: true });

const getAnimationStyle = (index) => {
    if (index < props.currentStatus) {
        return {
            animation: `fill 5s forwards linear`,
            animationName: `fill-${animationKeys.value[index]}`,
        };
    } else if (index === props.currentStatus) {
        return {
            animation: `none`,
        };
    } else {
        return {
            animation: `none`,
        };
    }
};
</script>

<style scoped>
#status-counter {
    position: absolute;
    top: 10px;
    width: 100%;
    padding: 0 10px;
}

.status-bars {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.status-bar {
    flex-grow: 1;
    margin: 0 2px;
    height: 3px;
    background-color: #d2f2f5;
    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    position: relative;
    overflow: hidden;
}

.status-bar.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: #50b7c1;
}

.status-bar.animate::after {
    animation: fill 10s forwards linear;
}

/* Keyframe animation */
@keyframes fill {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
</style>
