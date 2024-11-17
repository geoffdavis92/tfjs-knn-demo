const classifier = knnClassifier.create();
let mobileNet

function addExample(domID, classID) {
  const features = mobileNet.infer(document.getElementById(domID), true);
  classifier.addExample(features, classID);        
}

async function runKNN() {
  // Use MobileNet to get features
  mobileNet = await mobilenet.load();

  // Add examples of two classes
  addExample('bunny1', 0)
  addExample('bunny2', 0)
  addExample('bunny3', 0)
  addExample('sport1', 1)
  addExample('sport2', 1)
  addExample('sport3', 1)
  
  // Moment of truth
  const testImage = document.getElementById('test')
  const testFeature = mobileNet.infer(testImage, true);
  const predicted = await classifier.predictClass(testFeature)
  if (predicted.classIndex === 0) {
    document.getElementById("result").innerText = "A Bunny"
  } else {
    document.getElementById("result").innerText = "A Sports Car"
  }
}

export default runKNN