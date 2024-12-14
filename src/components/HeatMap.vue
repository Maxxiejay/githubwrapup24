<template>
    <div class="heatmap-wrapper">
      <div ref="heatmapContainer" class="heatmap-container">
        <div
          v-for="(value, index) in data"
          :key="index"
          class="heatmap-cell"
          :style="{ backgroundColor: getColor(value) }"
          :title="`Value: ${value}`"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { gsap } from 'gsap';
  
  const props = defineProps({
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    rows: {
      type: Number,
      required: true,
      default: 7, // Default to 7 rows (days of the week)
    },
    cellSize: {
      type: Number,
      required: false,
      default: 4, // Default size of each cell in pixels
    },
  });
  
  // Function to determine color based on value
  const getColor = (value) => {
    if (value === 0) return "#ebedf0";
    if (value < 5) return "#9be9a8";
    if (value < 10) return "#40c463";
    if (value < 20) return "#30a14e";
    return "#216e39";
  };
  
  const heatmapTL = gsap.timeline();

  const animateHeatmap = () => {
    heatmapTL
      .from(".heatmap-cell", { scale: 0, duration: 0.5, stagger: 0.01, ease: "back.out(1.7)" })
      
  };

  const heatmapContainer = ref(null);
  onMounted(() => {
    animateHeatmap();
  });
  </script>
  
  <style scoped>
  .heatmap-wrapper {
    width: 100%;
    overflow-x: auto; /* Allow horizontal scrolling for large datasets */
    padding: 10px;
    box-sizing: border-box;
  }
  
  .heatmap-container {
    display: grid;
    grid-template-rows: repeat(var(--rows), var(--cell-size));
    grid-auto-flow: column; /* Continuous horizontal layout */
    gap: 2px;
    --cell-size: 4px; /* Default cell size, adjustable via props */
    --rows: 7; /* Default to 7 rows (days of the week) */
  }
  
  .heatmap-cell {
    width: var(--cell-size);
    height: var(--cell-size);
    border-radius: 2px;
    cursor: pointer;
    transform-origin: center;
    background-color: #ebedf0; /* Default color */
  will-change: transform, opacity;
}

  </style>
  