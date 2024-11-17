const classifier = knnClassifier.create();
let mobileNet

function addExample(domID, classID) {
  const features = mobileNet.infer(document.getElementById(domID), true);
  classifier.addExample(features, classID);        
}

async function runKNN() {
  // Use MobileNet to get features
  mobileNet = await mobilenet.load();

  // Add examples of random doors (class 0) and your door (class 1)
  addExample('door1', 0)
  addExample('door2', 0)
  addExample('door3', 0)
  addExample('door4', 0)
  addExample('door5', 0)
  addExample('mydoor1', 1)
  addExample('mydoor2', 1)
  
  // Verify delivery location
  const testImage = document.getElementById('test')
  const testFeature = mobileNet.infer(testImage, true);
  const predicted = await classifier.predictClass(testFeature)
  if (predicted.classIndex === 1) {
    document.getElementById("result").innerText = "✅ Correct Delivery Address"
  } else {
    document.getElementById("result").innerText = "❌ Wrong Address - Please Double Check"
  }
}

export default runKNN