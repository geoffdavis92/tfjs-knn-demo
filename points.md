# AI Implementation Walkthrough

## Core Setup
1. **TensorFlow.js Integration**
   ```html:index.html
   <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.7.0/dist/tf.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.0"></script>
   <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.2"></script>
   ```
   - Loads required ML models directly in browser
   - No server-side processing needed

## Implementation Flow
1. **Model Initialization**
   ```javascript
   mobileNet = await mobilenet.load();
   const classifier = knnClassifier.create();
   ```
   - Loads pre-trained MobileNet model
   - Creates KNN classifier instance

2. **Training Process**
   ```javascript
   function addExample(domID, classID) {
       const features = mobileNet.infer(document.getElementById(domID), true);
       classifier.addExample(features, classID);
   }
   // Class 1-5: Different incorrect doors
   // These help the model learn what "not our door" looks like
   addExample('door1', 'door1')   // 123 Main St
   addExample('door2', 'door2')   // 127 Main St
   addExample('door3', 'door3')   // 129 Main St
   addExample('door4', 'door4')   // 131 Main St
   addExample('door5', 'door5')   // 133 Main St

   // Class 6: The correct delivery door
   // Multiple examples help with different lighting/angles
   addExample('myDoor1', 'myDoor')  // 125 Main St - Front view
   addExample('myDoor2', 'myDoor')  // 125 Main St - Slight angle
   addExample('myDoor3', 'myDoor')  // 125 Main St - Different time of day
   ```
   - Creates 6 distinct classes (5 wrong + 1 right)
   - Each class represents a unique door location
   - Multiple examples of correct door improve recognition
   - Training data helps model learn:
     1. What makes each door unique
     2. What variations of the correct door look like
     3. How to distinguish between similar-looking doors

3. **Feature Extraction**
   ```javascript
   function addExample(domID, classID) {
       const features = mobileNet.infer(document.getElementById(domID), true);
       classifier.addExample(features, classID);
   }
   ```
   - Uses MobileNet for feature extraction
   - Adds examples to KNN classifier

4. **Prediction & Analysis**
   ```javascript
   const testFeature = mobileNet.infer(testImage, true);
   const prediction = await classifier.predictClass(testFeature, 3); // Top 3 matches
   ```
   - Extracts features from test image
   - Returns top 3 matching locations

5. **Return the Results**
   ```javascript
   if (prediction.label === 'myDoor') {
       message = `✅ Correct Delivery Address: ${doorGraph.myDoor.address}\n`
   } else {
       const predictedDoor = doorGraph[prediction.label]
       message = `❌ Wrong Address - You're at ${predictedDoor.address}\n`
       
       // Check neighboring locations
       const edge = predictedDoor.edges.find(e => e.neighbor === 'myDoor')
       if (edge) {
           message += `The correct address is one house to the ${edge.direction}!`
       }
   }
   ```
   - Provides context-aware feedback
   - Includes directional guidance
   - Shows confidence scores

6. **Spatial Relationships**
   ```javascript
   const doorGraph = {
       'door1': {
           address: '123 Main St',
           edges: [{ neighbor: 'myDoor', direction: 'right', distance: 1 }]
       },
       'myDoor': {
           address: '125 Main St',
           edges: [
               { neighbor: 'door1', direction: 'left', distance: 1 },
               { neighbor: 'wrongDelivery', direction: 'right', distance: 1 }
           ]
       }
   }
   ```
   - Tracks physical relationships between addresses
   - Enables intelligent navigation suggestions
