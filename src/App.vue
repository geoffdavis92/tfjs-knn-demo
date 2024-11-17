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
        <h3>Correct Delivery Address</h3>
        <img id="mydoor1" class="example" src="./assets/knn/mydoor1.jpg" />
        <img id="mydoor2" class="example" src="./assets/knn/mydoor2.jpg" />
      </div>
    </div>
    <div id="testContainer">
      <p>Verifying delivery location...</p>
      <img id="test" class="test" src="./assets/knn/wrong-delivery-test.jpg" />
      <h2 id="result">???</h2>
    </div>
</template>

<script setup>
import runKNN from './lib/knn.js'

runKNN()
</script>

<style scoped>
#examples {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.door-group {
  text-align: center;
}

.door-group h3 {
  margin-bottom: 10px;
}

.example {
  height: 14VW;
  margin: 5px;
}

#test {
  height: 30VW;
}

#testContainer {
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
  margin-top: 20px;
}
</style>
