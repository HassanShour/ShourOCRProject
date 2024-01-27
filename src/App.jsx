import React, { useEffect } from "react";
import Index from "./components/Index";
import useAppContext from "./context";

function App() {
  const { imageSrc, submit, result } = useAppContext();
  // the scanner animation
  function canvas() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const radius = canvas.width / 3;
    const angleStep = (Math.PI * 2) / 360;
    let theta = 0;

    //change frequencies for getting various curves
    const frequencyX = 7;
    const frequencyY = 7;

    window.requestAnimationFrame(draw);

    function draw() {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
      context.beginPath();

      for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
        const x =
          Math.sin(angle * frequencyX + theta) *
          Math.cos(angle + theta) *
          radius;
        const y =
          Math.cos(angle * frequencyY) * Math.sin(angle + theta) * radius;
        if (angle === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.lineWidth = 1;
      context.strokeStyle = "#CBEAFF";
      context.stroke();
      context.miterLimit = 0.1;
      context.closePath();

      theta += 0.04;
      window.requestAnimationFrame(draw);
    }
  }

  useEffect(() => {
    if (imageSrc && submit && !result) canvas();
  }, [imageSrc, submit, result]);
  
  return <Index />;
}

export default App;
