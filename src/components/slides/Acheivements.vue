<template>
    <div id="acheivements">
        <div class="total-contributions">
            <div class="notch"></div>
            <div class="content">
                <h3 class="title">total contributions</h3>
                <span class="value">{{ totalContributions }}</span>
            </div>
        </div>
        <div class="spinner"></div>
        <div class="longest-streak">
            <div class="notch"></div>
            <div class="content">
                <span class="value">{{ longestStreak }}</span>
                <h3 class="title">longest streak</h3>
                <div class="date">July 11 - August 4</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, ref } from 'vue';

const longestStreak = ref(0)
const totalContributions = ref(0)

const acheivementsTL = gsap.timeline()

const animateAcheivements = () => {
    acheivementsTL
        .to('#acheivements', {
            height: 400,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to('.content', {
            opacity: 1,
            duration: 0.5
        })
        .to({ value: 0 }, {
            value: 19,
            duration: 1,
            ease: "power1.out",
            onUpdate: function () {
                longestStreak.value = Math.floor(this.targets()[0].value); // Update the text content
            },
        })
        .to({ value: 0 }, {
            value: 1035,
            duration: 1,
            ease: "none",
            onUpdate: function () {
                totalContributions.value = Math.floor(this.targets()[0].value); // Update the text content
            },
        }, '-=1');
}

onMounted(() => {
    animateAcheivements()
})
</script>

<style scoped>
#acheivements {
    height: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.spinner {
    height: 1px;
    width: 90%;
    /* border-radius: 50%; */
    background-color: var(--secondary-color);
    position: absolute;
    z-index: 99;
}

.notch {
    clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%);
    height: 15px;
    width: 200px;
    position: absolute;
    /* right: -50%; */
}

.total-contributions,
.longest-streak {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    position: relative;
    height: 200px;
    width: 300px;
    background: var(--card-border);
    border: 2px solid var(--card-text);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--card-text);
    opacity: 0;
}

.content .value {
    font-size: 3rem;
    color: var(--secondary-color);
}

.content .date {
    font-size: 0.8rem;
}

.total-contributions {
    border: 2px solid var(--card-text);
    border-bottom: none;
}

.total-contributions .notch {
    top: 0;
    background: var(--card-text);
    transform: rotateZ(180deg);
}

.longest-streak {
    border: 2px solid var(--primary-color);
    border-top: none;
}

.longest-streak .notch {
    bottom: 0;
    margin-bottom: -1px;
    background: var(--primary-color);
}
</style>