<template>
  <div class="home">
    <div id="header">
      <h1>#GitHubWrapup24</h1>
    </div>
    <img src="../assets/svgs/planet.svg" alt="" class="planet">
    <div id="cta-box">
      <h2>GitHub 2024 At A Glance</h2>
      <p>Get personalized animation of your GitHub activity in 2024</p>
      <div class="username-request">
        <small class="error">{{ error.msg }}</small>
        <input type="text" v-model="username" :class="{'error-input' : error.isError}" class="username" placeholder="Your GitHub username">
        <button @click="review">Review</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import gsap from 'gsap';
import { ref, onMounted } from 'vue';

const error = ref({msg: '', isError: false});
const username = ref('');

const review = ()=>{
  if(username.value === ''){
    error.value.msg = 'Please enter your GitHub username';
    error.value.isError = true;
  } else {
    sessionStorage.setItem('username', username.value);
    sessionStorage.setItem('shared', false )
    getUserInfo(username.value)
    // router.push({name: 'anim'});
  }
}

const getUserInfo = (username) => {
  axios.post('http://githubwrap.futamart.com/github-stats',{
    "username": username
  })
  .then((res) => storeData(res.data))
  .catch((res) => console.log(res))
}

const storeData = (data) =>{
  console.log(data)
}

const animatePlanet = () => {
  gsap.to('.planet', {
    duration: 20,
    rotation: 360,
    repeat: -1,
    ease: 'none'
  });
}

onMounted(() => {
  animatePlanet();
});
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.planet {
  position: absolute;
  bottom: -20%;
  width: 100%;
}

#header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background: var(--linear-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  position: absolute;
  top: 0;
  width: 100%;
}

#cta-box {
  font-family: Arial, Helvetica, sans-serif;
  color: #adaaaa;
  width: 90%;
  margin-top: -30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  /* Semi-transparent white */
  backdrop-filter: blur(10px);
  /* Frosted glass effect */
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* Depth */
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* Light border */
  overflow: hidden;
}

#cta-box::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  /* background: radial-gradient(circle, var(--primary-color)); */
  z-index: 0;
  transform: rotate(30deg);
}

#cta-box h2 {
  color: #fff;
}

.username-request {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  z-index: 1;
}

.username-request input {
  width: 100%;
  padding: 15px 10px;
  border-radius: 5px;
  border: 2px solid #707077;
  margin-bottom: 10px;
  background-color: #adaaaa;
  z-index: 1;
}

.username-request input::placeholder {
  color: #fff;
  font-weight: bold;
}

.username-request button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #707077;
  background-color: var(--secondary-color-dark);
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}

.error {
  color: #bb1414;
}

.error-input {
  border: 2px solid #bb1414 !important;
}
</style>