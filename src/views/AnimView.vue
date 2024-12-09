<template>
  <div class="anim-view">
    <img class="octo" src="../assets/images/octocat.png" alt="">
    <div id="content">
      <ProfileCard />
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';

const animateStars = () => {
  // Animate stars diagonally
const starryBackground = document.querySelector(".anim-view");

  // Create stars dynamically
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.opacity = Math.random();
    star.style.width = star.style.height = Math.random() * 3 + "px";
    star.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`; // Random pastel colors
    starryBackground.appendChild(star);
    animateStar(star)
  }

  function animateStar(star) {
    const travelDistance = 200 + Math.random() * 100; // Random travel distance
    const duration = 10 + Math.random() * 5; // Random duration for each star

    gsap.fromTo(
      star,
      {
        x: 0, // Start at current position
        y: 0,
      },
      {
        x: `${200 + Math.random() * 100}vw`, // Move left by a random large distance
        y: `-=${200 + Math.random() * 100}vh`, // Move up by a random large distance
        duration: 10 + Math.random() * 5, // Randomize duration for variety
        ease: "none", // Linear motion for smoothness
        repeatDelay: -duration / 2.5, // Overlap animations to avoid gaps
        repeat: -1, // Infinite animation
        onRepeat: () => {
          // Reset position when the animation repeats
          star.style.left = Math.random() * 100 + "vw";
          star.style.top = Math.random() * 100 + "vh";
        },
      }
    );
  }
}

onMounted(() => {
  animateStars()
});
</script>

<style>
.about {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.octo {
  position: absolute;
  bottom: 0;
  left: -10%;
  width: 250px;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
}

#content{
  position: relative;
  z-index: 99;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>