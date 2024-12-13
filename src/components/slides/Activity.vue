<template>
    <div>
        <HeatMap :data="githubData" :rows="7" :cellSize="6" />
        <div class="active-day">Most Active Day Was June 16</div>
    </div>
</template>

<script setup>
import HeatMap from '@/components/HeatMap.vue';

const githubData = Array.from({ length: 365 }, () => Math.floor(Math.random() * 30));

</script>

<style scoped> 
.active-day {
    text-align: center;
    font-size: 1rem;
    color: var(--card-text);
    margin-top: 1rem;
}

</style>