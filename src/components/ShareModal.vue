<template>
    <div>
      <!-- Backdrop -->
      <div
        v-if="isVisible"
        class="modal-backdrop"
        @click="closeModal"
      ></div>
  
      <!-- Modal -->
      <div
        v-if="isVisible"
        class="modal"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-content">
          <button class="modal-close" @click="closeModal">&times;</button>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Control modal visibility
  const isVisible = ref(false);
  
  const openModal = () => {
    isVisible.value = true;
  };
  
  const closeModal = () => {
    isVisible.value = false;
  };
  
  // Expose these methods for external usage
  defineExpose({ openModal, closeModal });
  </script>
  
  <style scoped>
  /* Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  /* Modal Container */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    background: #000;
    border: 3px solid var(--secondary-color);
    border-radius: 8px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  
  /* Modal Content */
  .modal-content {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  /* Close Button */
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  