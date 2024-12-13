<template>
    <div id="title">
        <span>{{ text }}</span>
    </div>
</template>

<script setup>
defineProps({
    text: String,
})
</script>

<style scoped>
#title{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

span {
    font-size: 2rem;
    color: var(--card-text);
}
</style>