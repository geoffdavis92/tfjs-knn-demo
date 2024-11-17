# Front Door Delivery Verification Demo

This demo uses TensorFlow.js with MobileNet and KNN Classification to verify package deliveries are being made to the correct address by comparing the delivery location's front door with known examples.

## How it Works
1. The system is trained with:
   - 5 examples of random front doors (negative examples)
   - 2 examples of the correct delivery address's front door (positive examples)
2. When testing a delivery, the system will classify the door as either:
   - ✅ Correct Delivery Address
   - ❌ Wrong Address - Please Double Check
- HINT: Try swapping back and forth between the correct and incorrect test images to see how the model performs.

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Open the app in your browser at `http://localhost:5173`

