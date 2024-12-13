<template>
    <div id="top-tech">
        <div class="top">
            <div class="hexagon-container">
                <div class="hexagon hex-1">
                    <div class="hexagon-face hexagon-front">
                        <h1>#1</h1>
                    </div>
                    <div class="hexagon-face hexagon-back">
                        <img src="../../assets/images/vue.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="hexagon-container">
                <div class="hexagon hex-2">
                    <div class="hexagon-face hexagon-front">
                        <h1>#2</h1>
                    </div>
                    <div class="hexagon-face hexagon-back">
                        <img src="../../assets/images/php.png" alt="">
                    </div>
                </div>
            </div>
            <div class="hexagon-container">
                <div class="hexagon hex-3">
                    <div class="hexagon-face hexagon-front">
                        <h1>#3</h1>
                    </div>
                    <div class="hexagon-face hexagon-back">
                        <img src="../../assets/images/go.png" alt="">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';

const hexTL = gsap.timeline();
const animateHex = () =>{
    hexTL
    .to('.hex-3', { scale: 1, duration: 1, ease: 'bounce.in' })
    .to('.hex-2', { scale: 1, duration: 1, ease: 'power2.inOut' })
    .to('.hex-1', { scale: 1, duration: 1, ease: 'power2.inOut' })
    .to('.hex-3', { rotateY: 180, duration: 1, ease: 'power2.inOut' })
    .to('.hex-2', { rotateY: 180, duration: 1, ease: 'power2.inOut' })
    .to('.hex-1', { rotateY: 180, duration: 1, ease: 'power2.inOut' });
}

onMounted(() => {
    animateHex();
});
</script>

<style scoped>
#top-tech {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.top,
.bottom {
    display: flex;
    justify-content: center;
}

.bottom {
    margin-top: -30px;
}

.bottom .hexagon-container {
    margin: -8px;
}

.hexagon-container {
    position: relative;
    width: 170px;
    height: 170px;
    perspective: 1000px;
}

.hexagon {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: scale(0);
}

.hexagon:hover {
    transform: rotateY(180deg);
}

.hexagon-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
}

.hexagon-face img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.hexagon-front {
    background: #ffc728;
    color: #000;
}

.hexagon-back {
    background: #fafafa;
    color: #333;
    transform: rotateY(180deg);
}

.hexagon h1 {
    font-weight: bold;
    font-size: 2rem;
}

.top .hexagon-container .hexagon-front {
    background-color: var(--card-blue);
    color: var(--card-text);
}
.bottom .hexagon-container:nth-child(1) .hexagon-front {
    background-color: var(--card-text);
}
.bottom .hexagon-container:nth-child(2) .hexagon-front {
    background-color: var(--card-border);
    color: var(--card-text);
}
</style>