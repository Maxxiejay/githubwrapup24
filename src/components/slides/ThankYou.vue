<template>
  <div id="thank-you">
    <div class="border">
      <div class="inner">
        <p id="thank-you-message"><span id="cursor">_</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';

const message = `Your 2024 in code—pushing boundaries, one commit at a time. <br> Here’s to rewriting the future in 2025. <br> Keep building🚀`;

const thankYouTL = gsap.timeline();

const animateThankYou = () => {
  const thankYouMessage = document.getElementById('thank-you-message');
  thankYouTL
    .to('#thank-you .border', {
      height: 355,
      duration: 0.8,
      ease: 'power2.in'
    })
    .to('#thank-you .inner', {
      height: 350,
      padding: 20,
      duration: 0.8,
      ease: 'power2.in'
    }, '-=0.8')
    .to({}, {
      duration: message.length * 0.08, // Adjust typing speed
      onUpdate: function () {
        const progress = Math.floor(this.progress() * message.length);
        thankYouMessage.innerHTML = message.slice(0, progress);
      },
      ease: "linear", // Keep it linear for a natural typing effect
    })
};

onMounted(() => {
  animateThankYou();
});
</script>

<style scoped>
#thank-you {
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#thank-you .border {
  clip-path: polygon(95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%, 0 0);
  width: 305px;
  height: 10px;
  background-color: #50b7c1;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#thank-you .inner {
  clip-path: polygon(95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%, 0 0);
  width: 300px;
  height: 5px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: var(--card-text);
  text-align: center;
  border-radius: 3px;
}

#cursor {
  display: inline-block;
  animation: blink 0.5s step-end infinite;
  color: #fff;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

</style>