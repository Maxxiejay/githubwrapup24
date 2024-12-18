<template>
  <div class="anim-view" ref="gestureArea">
    <img class="octo" src="../assets/images/octocat.png" alt="">
    <StatusCounter :currentStatus="currentStatus + 1" :totalStatusNo="totalStatusNo" :paused="paused" />
    <div id="capture-area">
      <Title :text="getCurrentTitle" />
      <div id="content">
        <component :is="getCurrentSlide" />
      </div>
    </div>
  </div>
  <ShareModal ref="modalRef">
    <div class="share-btns">
      <img src="../assets/svgs/download.svg" alt="" class="download" @click="downloadImage">
      <img src="../assets/svgs/link.svg" alt="" class="link" @click="copyLink">
    </div>
  </ShareModal>
  <ShareButton v-if="!shared" @click="showModal" />
</template>

<script setup>
import gsap from 'gsap';
import { ref, onUnmounted, onMounted, computed } from 'vue';
import ProfileCard from '@/components/slides/ProfileCard.vue';
import StatusCounter from '@/components/StatusCounter.vue';
import ShareButton from '@/components/ShareButton.vue';
import ShareModal from '@/components/ShareModal.vue';
import Title from '@/components/Title.vue';
import Activity from '@/components/slides/Activity.vue';
import TopRepos from '@/components/slides/TopRepos.vue';
import Collaboration from '@/components/slides/Collaboration.vue';
import Acheivements from '@/components/slides/Acheivements.vue';
import TopTech from '@/components/slides/TopTech.vue';
import ThankYou from '@/components/slides/ThankYou.vue';
import { useGestures } from '@/composables/useGestures';

const username = sessionStorage.getItem('username')
const shared = ref(true)

// Create a template ref for the modal
const modalRef = ref(null);

const showModal = () => {
  modalRef.value.openModal(); // Call the exposed method to open the modal
};

const hideModal = () => {
  modalRef.value.closeModal(); // Call the exposed method to close the modal
};

// const sharedLink = ref('hello')
const sharedLink = ref(`https://githubwrapup24.netlify.app/shared/${username}`)

const copyLink = () => {
  navigator.clipboard.writeText(sharedLink.value);
}

const slides = [
  ProfileCard,
  Activity,
  TopRepos,
  Collaboration,
  TopTech,
  Acheivements,
  ThankYou
];

const titles = [
  'GitHub Profile',
  'Activity',
  'Top Repos',
  'Collaboration',
  'Top Tech',
  'Acheivements',
  'Thank You!'
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

const totalStatusNo = ref(7);
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

// const pause = () => {
//   console.log('Paused');
//   // Logic to pause the status progression
//   if (statusInterval.value) {
//     clearInterval(statusInterval.value);
//   }
// };

const next = () => {
  console.log('Next');
  if (currentStatus.value < totalStatusNo.value - 1) {
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
  // onPause: pause,
  onNext: next,
  onPrevious: previous,
});

// Create a new Audio instance
const audio = new Audio(require('../assets/audio/bg_music.mp3'));

const playBgMusic = () => {
  audio.play();
  audio.addEventListener('ended', () => {
    playBgMusic()
  });

}

const stopMusic = () => {
  audio.pause();       // Pause the audio
  audio.currentTime = 0; // Reset playback time to the beginning
}

onMounted(() => {
  playBgMusic()
  shared.value = sessionStorage.getItem('shared') === 'true' ? true : false;
  // username.value = sessionStorage.getItem('username');
  if (gestureArea.value) {
    addListeners(gestureArea.value);
  }
  startInterval(); // Start the interval when the component is mounted
  animateStars()
});

onUnmounted(() => {
  stopMusic()
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

#capture-area {
  display: contents;
}

.share-btns {
  display: flex;
  justify-content: space-around;
}

.share-btns img {
  width: 50px;
}

#content {
  position: relative;
  z-index: 99;
  /* height: 100%; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>