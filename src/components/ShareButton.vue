<template>
    <div id="share-btn">
        <div class="border">
            <div class="inner">Share</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#share-btn {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#share-btn .border {
    clip-path: polygon(0 0, 90% 0, 100% 20%, 100% 100%, 10% 100%, 0% 80%);
    width: 100px;
    height: 40px;
    /* padding: 10px; */
    background-color: #50b7c1;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

#share-btn .inner {
    clip-path: polygon(0 0, 90% 0, 100% 20%, 100% 100%, 10% 100%, 0% 80%);
    width: 95px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
</style>