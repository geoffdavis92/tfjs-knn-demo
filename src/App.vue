<template>
    <h1>Delivery Address Verification</h1>
    <h2>Front Door Recognition System</h2>
    <div id="examples">
      <div class="door-group">
        <h3>Random Front Doors</h3>
        <img id="door1" class="example" src="./assets/knn/door1.jpg" />
        <img id="door2" class="example" src="./assets/knn/door2.jpg" />
        <img id="door3" class="example" src="./assets/knn/door3.jpg" />
        <img id="door4" class="example" src="./assets/knn/door4.jpg" />
        <img id="door5" class="example" src="./assets/knn/door5.jpg" />
      </div>
      <div class="door-group">
        <h3>Correct Delivery Address (125 Main St)</h3>
        <img id="myDoor1" class="example" src="./assets/knn/myDoor1.jpg" />
        <img id="myDoor2" class="example" src="./assets/knn/myDoor2.jpg" />
        <img id="myDoor3" class="example" src="./assets/knn/myDoor3.jpg" />
      </div>
    </div>
    <div id="testContainer">
      <p>Verifying delivery location...</p>
      <div class="test-controls">
        <button @click="setTestImage('delivery-test.jpg')">Test Correct Delivery</button>
        <button @click="setTestImage('wrong-delivery-test.jpg')">Test Wrong Delivery</button>
      </div>
      <img 
        v-if="currentTestImage" 
        id="test" 
        class="test" 
        :src="currentTestImage" 
        @load="onImageLoad"
      />
      <pre id="result" class="result">{{ resultText }}</pre>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import runKNN from './lib/knn.js'
import deliveryTest from './assets/knn/delivery-test.jpg'
import wrongDeliveryTest from './assets/knn/wrong-delivery-test.jpg'

const testImages = [deliveryTest, wrongDeliveryTest]
const currentTestImage = ref(testImages[0])
const resultText = ref('Analyzing delivery location...')

const onImageLoad = () => {
  console.log('Image loaded, running KNN...')
  runKNN()
}

const setTestImage = (imageName) => {
  console.log('setting test image to', imageName)
  resultText.value = 'Analyzing delivery location...'
  currentTestImage.value = imageName === 'delivery-test.jpg' ? deliveryTest : wrongDeliveryTest
}
</script>

<style scoped>
#examples {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.door-group {
  text-align: center;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.door-group h3 {
  margin-bottom: 10px;
  color: #333;
}

.example {
  height: 14VW;
  margin: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.test-controls {
  margin: 15px 0;
}

.test-controls button {
  margin: 0 10px;
  padding: 8px 16px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.test-controls button:hover {
  background: #34495e;
}

#test {
  height: 30VW;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

#testContainer {
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
  margin-top: 20px;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  white-space: pre-wrap;
  max-width: 80%;
  text-align: left;
}
</style>
