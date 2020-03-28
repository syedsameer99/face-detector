import React, { Component } from "react";
import "./Script.css";
import * as faceapi from "face-api.js";

export class Script extends Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
  }

  componentDidMount() {
    // getting access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => (this.videoTag.current.srcObject = stream))
      .catch(console.log);
  }

  render() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("../../models"),
      faceapi.nets.faceLandmarkNet.loadFromUri("../../models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("../../models"),
      faceapi.nets.faceExpressionNet.loadFromUri("../../models")
    ]).then(this.videoTag);

    this.videoTag.addEventListner("play", () => {
      const video = document.getElementById("v");
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const dispalaySize = {
        width: this.videoTag.width,
        height: this.videoTag.height
      };

      setInterval(async () => {
        const detection = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandMarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detection,
          dispalaySize
        );
        faceapi.draw.drawDetections(canvas, resizedDetections);
      }, 100);
    });

    return (
      <div>
        <video id="v" className="vid" ref={this.videoTag} autoPlay />
      </div>
    );
  }
}

export default Script;
