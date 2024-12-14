<template>
    <div id="top-repos">
        <div class="graph-cont">
            <div class="graph">
                <div class="graph-bar bar-1">
                    <div class="title">
                        <div>
                            <span class="hashtag">#1</span>
                            <span class="repo-name">bizfactory</span>
                        </div>
                        <Parallelograms color="#ffffff" />
                    </div>
                    <div class="breakdown">
                        <small><span>Commits:</span> <span>100</span></small>
                        <small><span>stars:</span> <span>20</span></small>
                        <small><span>Forks:</span> <span>10</span></small>
                    </div>
                </div>
                <div class="graph-bar bar-2">
                    <div class="title">
                        <div>
                            <span class="hashtag">#2</span>
                            <span class="repo-name">anythingfoodng</span>
                        </div>
                        <Parallelograms />
                    </div>
                    <div class="breakdown">
                        <small><span>Commits:</span> <span>100</span></small>
                        <small><span>stars:</span> <span>20</span></small>
                        <small><span>Forks:</span> <span>10</span></small>
                    </div>
                </div>
                <div class="graph-bar bar-3">
                    <div class="title">
                        <div>
                            <span class="hashtag">#3</span>
                            <span class="repo-name">ueye</span>
                        </div>
                        <Parallelograms />
                    </div>
                    <div class="breakdown">
                        <small><span>Commits:</span> <span>100</span></small>
                        <small><span>stars:</span> <span>20</span></small>
                        <small><span>Forks:</span> <span>10</span></small>
                    </div>
                </div>
                <!-- <div class="graph-bar" style="height: 20%"></div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Parallelograms from '../Parallelograms.vue';
import gsap from 'gsap';

const reposTL = gsap.timeline();

const animateRepos = () => {
    reposTL
    .to('.bar-1', { right: 0, duration: 1, ease: 'power2.inOut' })
    .to('.bar-2', { left: 0, duration: 1, ease: 'power2.inOut' }, '-=1')
    .to('.bar-3', { bottom: 0, duration: 1, ease: 'power2.inOut' }, '-=1');
}

onMounted(() => {
    animateRepos();
});
</script>

<style scoped>
#top-repos {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 90%;
    height: 100%;
}

.graph-cont {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.graph {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: flex-end; */
    width: 100%;
    max-width: 500px;
    height: 400px;
    background-color: var(--card-dark);
    border: 2px solid #50b7c1;
    border-radius: 5px;
    padding: 10px;
    gap: 20px;
    overflow: hidden;
}

.graph-bar {
    box-sizing: border-box;
    /* width: 40px; */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.graph .bar-1{
    right: -110%;
}

.graph .bar-2{
    left: -110%;
}

.graph .bar-3{
    bottom: -110%;
}

.graph-bar .title {
    font-size: 1.2rem;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
}

.graph-bar .breakdown {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 10px;
}

.graph-bar .breakdown small {
    font-size: 0.6rem;
    display: flex;
    justify-content: space-between;
}

.graph-bar:nth-child(1) {
    background-color: var(--card-blue);
    color: var(--card-text);
}
.graph-bar:nth-child(1) .parallelograms > div {
    background-color: var(--card-text);
}

.graph-bar:nth-child(2) {
    background-color: var(--card-text);
}

.graph-bar:nth-child(3) {
    background-color: #50b7c1;
}
</style>