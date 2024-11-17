<template>
    <h1>KNN + MobileNet Classifier</h1>
    <h2>Bunnies vs Sports Cars</h2>
    <div id="examples">
      <img id="bunny1" class="example" src="./assets/knn/bunny1.jpg" />
      <img id="bunny2" class="example" src="./assets/knn/bunny2.jpg" />
      <img id="bunny3" class="example" src="./assets/knn/bunny3.jpg" />
      <p>VS</p>
      <img id="sport1" class="example" src="./assets/knn/sport1.jpg" />
      <img id="sport2" class="example" src="./assets/knn/sport2.jpg" />
      <img id="sport3" class="example" src="./assets/knn/sport3.jpg" />      
    </div>
    <div id="testContainer">
      <p>AI believes the following photo is...</p>
      <img id="test" class="test" src="./assets/knn/test.jpeg" />
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
  align-items: center;  
}

#examples p {
  font-weight: bold;
  padding: 10px;
}

.example {
  height: 14VW;
}

#test {
  height: 30VW;
}

#testContainer {
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
}
</style>
