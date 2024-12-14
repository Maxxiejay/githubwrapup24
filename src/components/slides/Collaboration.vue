<template>
    <div id="collaboration">
        <div class="collab-cont">
            <div class="pull-requests">
                <span class="title">pull requests</span>
                <span class="value">25</span>
            </div>
            <div class="issues">
                <span class="title">issues</span>
                <span class="value">4</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';

const collabTL = gsap.timeline();
const animateCollab = () => {
    collabTL
    .to('.pull-requests', { top: 0, duration: 1, ease: 'power2.inOut' })
    .to('.issues', { bottom: 0, duration: 1, ease: 'power2.inOut' }, '-=1');
}

onMounted(() => {
    animateCollab();
});

</script>

<style scoped>

#collaboration {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
}

.collab-cont {
    width: 100%;
    height: 300px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    overflow: hidden;
}

.issues, .pull-requests{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
}

.issues .value, .pull-requests .value {
    font-size: 3.5rem;
}

.pull-requests {

    background-color: var(--card-blue);
    color: var(--card-text);
    clip-path: polygon(0 0, 100% 0%, 85% 100%, 0% 100%);
    top: -110%;
}

.issues {
    clip-path: polygon(15% 1%, 100% 0%, 100% 100%, 0 100%);
    background-color: var(--card-text);
    flex-direction: column-reverse;
    bottom: -110%;
}
</style>