<template>
    <div class="heatmap-wrapper">
      <div class="heatmap-container">
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
  const props = defineProps({
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    rows: {
      type: Number,
      required: true,
      default: 7, // Default to 7 rows (e.g., days of the week for GitHub-style layout)
    },
    cellSize: {
      type: Number,
      required: false,
      default: 15, // Default size of each cell in pixels
    },
  });
  
  const getColor = (value) => {
    // Define a color scale (adjust thresholds as needed)
    if (value === 0) return "#ebedf0"; // GitHub light gray for no contributions
    if (value < 5) return "#9be9a8";
    if (value < 10) return "#40c463";
    if (value < 20) return "#30a14e";
    return "#216e39";
  };
  </script>
  
  <style scoped>
  .heatmap-wrapper {
    max-width: 350px;
    overflow-x: auto; /* Allow horizontal scrolling for large data sets */
    padding: 10px;
    box-sizing: border-box;
  }
  
  .heatmap-container {
    display: grid;
    grid-template-rows: repeat(var(--rows), var(--cell-size));
    grid-auto-flow: column; /* Continuous horizontal layout */
    gap: 2px;
    --cell-size: 5px; /* Default cell size, adjustable via props */
    --rows: 7; /* Default to 7 rows for days of the week */
  }
  
  .heatmap-cell {
    width: var(--cell-size);
    height: var(--cell-size);
    border-radius: 2px;
    transition: transform 0.2s ease;
    will-change: transform; /* Optimize for animations */
    cursor: pointer;
  }
  
  .heatmap-cell:hover {
    transform: scale(1.1);
    z-index: 1; /* Pop hover effect above other cells */
  }
  </style>
  