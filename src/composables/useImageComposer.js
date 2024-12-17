// import { ref } from 'vue';
// import html2canvas from 'html2canvas';

// export default function useImageComposer() {
//   const backgroundImage = ref('');

//   /**
//    * Sets the background image URL.
//    * @param {String} url - URL of the background image.
//    */
//   const setBackgroundImage = (url) => {
//     backgroundImage.value = url;
//   };

//   /**
//    * Captures a specific DOM element, combines it with the background image, and downloads the final image.
//    * @param {String} captureAreaId - ID of the element to capture.
//    * @param {Object} options - Configuration options for rendering.
//    */
//   const createImage = async (captureAreaId, options = {}) => {
//     try {
//       // Validate input
//       if (!backgroundImage.value) {
//         throw new Error('Background image URL is not set.');
//       }

//       // Step 1: Capture the target area
//       const captureArea = document.getElementById(captureAreaId);
//       if (!captureArea) {
//         throw new Error(`Element with ID "${captureAreaId}" not found.`);
//       }

//       const componentCanvas = await html2canvas(captureArea, {
//         useCORS: true,
//         ...options,
//       });

//       // Step 2: Load the background image
//       const background = new Image();
//       background.src = backgroundImage.value;
//       await new Promise((resolve, reject) => {
//         background.onload = resolve;
//         background.onerror = reject;
//       });

//       // Step 3: Create a final canvas and combine the images
//       const finalCanvas = document.createElement('canvas');
//       finalCanvas.width = options.width || background.width;
//       finalCanvas.height = options.height || background.height;
//       const ctx = finalCanvas.getContext('2d');

//       // Draw background image
//       ctx.drawImage(background, 0, 0, finalCanvas.width, finalCanvas.height);

//       // Draw captured components on top
//       ctx.drawImage(componentCanvas, 0, 0);

//       // Step 4: Convert to an image and trigger download
//       const link = document.createElement('a');
//       link.href = finalCanvas.toDataURL('image/png');
//       link.download = options.fileName || 'final-image.png';
//       link.click();
//     } catch (error) {
//       console.error('Error creating image:', error);
//     }
//   };

//   return {
//     backgroundImage,
//     setBackgroundImage,
//     createImage,
//   };
// }
