const zoom_width = 1920
const zoom_height = 1080
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

let keys = Object.keys(reaction_dictionary)

let reactions = keys.map((key) => {
  return new Reaction(key, reaction_dictionary[key])
})

// Classifier Variable
let classifier

// Video
let video
let flippedVideo
// To store the classification
let label = ''

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(MODEL + 'model.json')
  reactions.forEach((reaction) => reaction.preload())
}

function setup() {
  createCanvas(zoom_width / 3, zoom_height / 3)
  // Create the video
  video = createCapture(VIDEO)
  video.size(zoom_width / 6, zoom_height / 6)
  video.hide()

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo()
  reactions.forEach((reaction) => reaction.setup())
}

function draw() {
  background(0, 255, 0)
  tint(255)
  console.log(label)
  reactions.forEach((reaction) => reaction.render(label))
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult)
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error)
    return
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label
  // Classifiy again!
  classifyVideo()
}
