<template>
  <div class="anim-view" ref="gestureArea">
    <img class="octo" src="../assets/images/octocat.png" alt="">
    <StatusCounter :currentStatus="currentStatus +1" :totalStatusNo="totalStatusNo" :paused="paused"/>
    <Title :text="getCurrentTitle" />
    <div id="content">
      <component :is="getCurrentSlide" />
    </div>
    <ShareButton />
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { ref, onUnmounted, onMounted, computed } from 'vue';
import ProfileCard from '@/components/slides/ProfileCard.vue';
import StatusCounter from '@/components/StatusCounter.vue';
import ShareButton from '@/components/ShareButton.vue';
import Title from '@/components/Title.vue';
import Activity from '@/components/slides/Activity.vue';
import TopRepos from '@/components/slides/TopRepos.vue'; 
import Collaboration from '@/components/slides/Collaboration.vue';
import TopTech from '@/components/slides/TopTech.vue';
import { useGestures } from '@/composables/useGestures'; // Adjust the path as needed

const title = ref('GitHub Profile');

const slides = [
  ProfileCard,
  Activity,
  TopRepos,
  Collaboration,
  TopTech
];

const titles = [
  'GitHub Profile',
  'Activity',
  'Top Repos',
  'Collaboration',
  'Top Tech'
]

// Computed property to get the current title based on the status
const getCurrentTitle = computed(() => titles[currentStatus.value]);

// Computed property to get the current component based on the status
const getCurrentSlide = computed(() => slides[currentStatus.value]);

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

const totalStatusNo = ref(5);
const currentStatus = ref(0);
const paused = ref(false);

const gestureArea = ref(null);

const statusInterval = ref(null);

const startInterval = () => {
  if (statusInterval.value) {
    clearInterval(statusInterval.value);
  }
  statusInterval.value = setInterval(() => {
    next();
  }, 10000);
};

const pause = () => {
  console.log('Paused');
  // Logic to pause the status progression
  if (statusInterval.value) {
    clearInterval(statusInterval.value);
  }
};

const next = () => {
  console.log('Next');
  if (currentStatus.value < totalStatusNo.value) {
    currentStatus.value++;
  }
  console.log(currentStatus.value);
  startInterval(); // Restart the interval
  
};

const previous = () => {
  console.log('Previous');
  if (currentStatus.value > 0) {
    currentStatus.value--;
  }
  startInterval(); // Restart the interval
  console.log(currentStatus.value);

};

// Use the composable
const { addListeners, removeListeners } = useGestures({
  onPause: pause,
  onNext: next,
  onPrevious: previous,
});

// Heat Map


onMounted(() => {
  if (gestureArea.value) {
    addListeners(gestureArea.value);
  }
  startInterval(); // Start the interval when the component is mounted
  animateStars()
});

onUnmounted(() => {
  if (gestureArea.value) {
    removeListeners(gestureArea.value);
  }
  if (statusInterval.value) {
    clearInterval(statusInterval.value);
  }
});
</script>

<style>
.anim-view {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.octo {
  position: absolute;
  bottom: -15px; 
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
  /* height: 100%; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>