const classifier = knnClassifier.create();
let mobileNet

function addExample(domID, classID) {
    const features = mobileNet.infer(document.getElementById(domID), true);
    classifier.addExample(features, classID);
}

// Define our physical door relationships
const doorGraph = {
    'door1': {
        address: '123 Main St',
        edges: [{ neighbor: 'myDoor', direction: 'right', distance: 1 }]
    },
    'door2': {
        address: '127 Main St',
        edges: []  // No known neighbors in our dataset
    },
    'door3': {
        address: '129 Main St',
        edges: []
    },
    'door4': {
        address: '131 Main St',
        edges: []
    },
    'door5': {
        address: '133 Main St',
        edges: []
    },
    'myDoor': {
        address: '125 Main St',
        edges: [
            { neighbor: 'door1', direction: 'left', distance: 1 },
            { neighbor: 'wrongDelivery', direction: 'right', distance: 1 }
        ]
    },
    'wrongDelivery': {
        address: '127 Main St',
        edges: [{ neighbor: 'myDoor', direction: 'left', distance: 1 }]
    }
}

async function runKNN() {
    mobileNet = await mobilenet.load();

    // Train with all our examples
    addExample('door1', 'door1')
    addExample('door2', 'door2')
    addExample('door3', 'door3')
    addExample('door4', 'door4')
    addExample('door5', 'door5')

    // Multiple angles of target door
    addExample('myDoor1', 'myDoor')
    addExample('myDoor2', 'myDoor')
    addExample('myDoor3', 'myDoor')

    const testImage = document.getElementById('test')
    const testFeature = mobileNet.infer(testImage, true);
    const prediction = await classifier.predictClass(testFeature, 3) // Get top 3 matches

    // Provide intelligent feedback
    const result = document.getElementById("result")
    let message = ''
    if (prediction.label === 'myDoor') {
        message = `✅ Correct Delivery Address: ${doorGraph.myDoor.address}\n`
    } else {
        const predictedDoor = doorGraph[prediction.label]
        message = `❌ Wrong Address - You're at ${predictedDoor.address}\n`

        // Check if we're at a neighboring house
        const edge = predictedDoor.edges.find(e => e.neighbor === 'myDoor')
        if (edge) {
            message += `The correct address (${doorGraph.myDoor.address}) is one house to the ${edge.direction}!`
        } else {
            message += `Please check the delivery address: ${doorGraph.myDoor.address}`
        }

    }
    // Add confidence information
    message += `\n\nConfidence Scores:`
    Object.entries(prediction.confidences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .forEach(([door, confidence]) => {
            message += `\n${doorGraph[door].address}: ${(confidence * 100).toFixed(1)}%`
        })

    result.innerText = message
}

export default runKNN