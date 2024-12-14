<template>
    <div>
        <HeatMap :data="githubData" :rows="7" :cellSize="6" />
        <div class="active-day"><span>Most Active Day Was June 16</span></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HeatMap from '@/components/HeatMap.vue';
import gsap from 'gsap';

const activeDayTL = gsap.timeline();

const animateActiveDay = () => {
    activeDayTL
    .from('.active-day span', { bottom: '-110%', duration: 5, ease: 'bounce.out' });
}

onMounted(() => {
    animateActiveDay();
});

const githubData = Array.from({ length: 365 }, () => Math.floor(Math.random() * 30));

</script>

<style scoped> 
.active-day {
    text-align: center;
    font-size: 1rem;
    color: var(--card-text);
    margin-top: 1rem;
    overflow: hidden;
    /* position: relative; */
    height: 30px;
    width: 100%;
}

.active-day span {
    position: relative;
    left: 0;
    bottom: 0;
    /* display: none; */
}
</style>