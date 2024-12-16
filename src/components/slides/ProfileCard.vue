<template>
    <div id="profile-card">
        <div class="glowing-dot"></div>
        <div class="profile-image">
            <div class="profile-img">
                <div class="insetbox-1"></div>
                <div class="insetbox-2"></div>
                <img src="../../assets/images/avatar.png" alt="User's profile image">
            </div>
        </div>
        <div class="profile-info">


            <h2 class="name"></h2>
            <!-- <p class="desc"></p> -->
            <p class="joined"></p>
            <p class="followers"></p>
            <p class="following"></p>
            <p class="repos"></p>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import gsap from 'gsap';
import { onMounted, ref } from 'vue';

const username = ref('');
const profileInfo = ref([
    "Joined: 2005",
    "Followers: 1.2M",
    "Following: 0",
    "Repos: 0",
]);

const animateprofileImage = () => {
    // GSAP timeline for profile image effect
    const flickerEffect = gsap
    .timeline({ repeat: 1 });

   flickerEffect
  .to(".profile-img", {
    opacity: 0.7, // Slight dim
    filter: "brightness(0.8)", // Reduce brightness
    duration: 0.1, // Short flicker
    ease: "power1.inOut",
  })
  .to(".profile-img", {
    opacity: 1, // Fully lit
    filter: "brightness(1)",
    duration: 0.05, // Quick return to normal
    ease: "power1.inOut",
    delay: Math.random() * 0.3, // Random delay for irregularity
  })
  .to(".profile-img", {
    opacity: 0.8, // Almost off
    filter: "brightness(0.8)",
    duration: 0.08,
    ease: "power1.inOut",
    delay: Math.random() * 0.2, // Another random delay
  })
  .to(".profile-img", {
    opacity: 1, // Back to normal
    filter: "brightness(1)",
    duration: 0.2,
    ease: "power1.inOut",
  });
};

const scrambleEffect = (element, text, duration) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const textArray = text.split("");

    gsap.to(element, {
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
            let scrambledText = textArray.map((char, index) => {
                if (Math.random() < 0.7) {
                    return chars[Math.floor(Math.random() * chars.length)];
                } else {
                    return char;
                }
            });
            element.textContent = scrambledText.join("");
        },
        onComplete: () => {
            element.textContent = text; // Finalize with the target text
        },
    });
};

const animateName = () => {
    const name = document.querySelector(".profile-info .name");
    scrambleEffect(name, username.value, 1);
};

const animateInfo = () => {
    const name = document.querySelectorAll(".profile-info p");
    name.forEach((element, index) => {
        scrambleEffect(element, profileInfo.value[index], 1);
    });
};

const animateProfileBox = () => {
    const profileBox = document.querySelector("#profile-card");
    gsap.to(profileBox, {
        width: "80%",
        duration: 1,
        onComplete: () => {
            gsap.to(profileBox, { height: "450px", duration: 1 });
        },
    });
};

const startAnimation = () => {
    // Start the profile box animation
    animateProfileBox();

    // After profile box animation ends, animate profile image
    gsap.to({}, {
        duration: 1,
        onComplete: () => {
            animateprofileImage();
        },
    });

    // After profile image animation ends, animate profile info
    gsap.to({}, {
        duration: 1,
        onComplete: () => {
            animateName();
            animateInfo();
        },
    });
};

onMounted(() => {
    if (sessionStorage.getItem('username') === null) {
        router.push('/');
    }else{
        username.value = sessionStorage.getItem('username');
    }
    startAnimation();
});

</script>

<style scoped>
#profile-card {
    position: relative;
    width: 20px;
    height: 20px;
    overflow: hidden;
    background: var(--card-dark);
    color: var(--card-text);
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--card-border);
    /* clip-path: polygon(5% 0, 95% 0, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0 95%, 0 5%); */
}

.profile-img {
    height: 250px;
    overflow: hidden;
    position: relative;
}

.profile-img img {
    width: 100%;
    transition: opacity 0.1s ease, filter 0.1s ease;
}

.insetbox-1,
.insetbox-2 {
    clip-path: polygon(0 0, 100% 0, 100% 0%, 75% 100%, 0 100%);
    height: 10px;
    width: 50px;
    position: absolute;
    z-index: 999;
    background-color: var(--card-dark);
}

.insetbox-1 {
    left: 0;
    margin-bottom: -50px;
}

.insetbox-2 {
    right: 0;
    bottom: 0px;
    /* margin-bottom: -50px; */
    transform: rotate(180deg);
}

.profile-info {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.profile-info .name {
    font-size: 1.5rem;
    font-weight: bold;
    /* text-align: center; */
}

.glowing-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    /* Makes it a circle */
    background: radial-gradient(circle, var(--card-text) 0%, #f3f2de 60%, transparent 100%);
    box-shadow: 0 0 10px var(--card-text), 0 0 20px var(--card-text), 0 0 30px var(--card-text);
    animation: pulse 2s infinite ease-in-out;
    z-index: 9999;
    top: 5px;
    left: 5px;
}

@keyframes pulse {
    0% {
        transform: scale(0.7);
        opacity: 1;
        box-shadow: 0 0 10px var(--card-text), 0 0 20px var(--card-text), 0 0 30px var(--card-text);
    }

    50% {
        transform: scale(1);
        opacity: 0.7;
        box-shadow: 0 0 20px var(--card-text), 0 0 40px var(--card-text), 0 0 60px var(--card-text);
    }

    100% {
        transform: scale(0.7);
        opacity: 1;
        box-shadow: 0 0 10px var(--card-text), 0 0 20px var(--card-text), 0 0 30px var(--card-text);
    }
}
</style>