<template>
    <div class="parallelograms">
        <div class="parallelogram" :style="{backgroundColor : color}"></div>
        <div class="parallelogram" :style="{backgroundColor : color}"></div>
        <div class="parallelogram" :style="{backgroundColor : color}"></div>
    </div>
</template>

<script setup>
defineProps({
    color: {
        type: String,
        default: '#000'
    },
})
</script>

<style>
.parallelograms {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 15px;
}

.parallelogram {
    /* width: 15px; */
    flex: 1;
    height: 15px;
    background-color: #000;
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
    /* margin: 0 10px; */
}

.parallelogram:nth-child(3) {
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>