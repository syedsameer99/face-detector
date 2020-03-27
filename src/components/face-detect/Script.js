import React, { Component } from "react";
import "./Script.css";

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
      faceapi.nets.tinyFaceDetector.loadFromUri("../../../public/models"),
      faceapi.nets.faceLandmarkNet.loadFromUri("../../../public/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("../../../public/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("../../../public/models")
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
