<template>
    <div>

    </div>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const username = ref('')
const route = useRoute()

onMounted(() =>{
    username.value = route.params.username
    sessionStorage.setItem('username', username.value )
    sessionStorage.setItem('shared', true )
    router.push('/anim')
})
</script>

<style scoped>

</style>