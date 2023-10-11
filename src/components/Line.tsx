import { useEffect, useRef } from 'react';

const Line = () => {
  // canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unit = 1000;
    let canvas: any;
    let context: any;
    let height: number;
    let width: number;
    let xAxis: number;
    let yAxis: number;

    // 웨이브 라인
    const paintSine = (t: number, zoom: number, delay: number) => {
      let x = t;
      let y = Math.sin(x) / zoom;
      context.moveTo(yAxis, unit * y + xAxis);
      for (let i = yAxis; i <= width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 15;
        context.lineTo(i, unit * y + xAxis);
      }
    };

    // 웨이브 라인 스타일
    const paintWave = (
      color: string,
      alpha: number,
      zoom: number,
      delay: number
    ) => {
      context.fillStyle = color;
      context.strokeStyle = color;
      context.globalAlpha = alpha;
      context.beginPath(); // start path
      paintSine(paint.t / 3.5, zoom, delay);
      context.stroke();
    };

    const paint = () => {
      context.clearRect(0, 0, width, height); // 캔버스 리셋
      paintWave('rgb(219, 163, 102)', 0.35, 1, 0); // 첫번째 웨이브 라인
      paintWave('rgb(219, 163, 102)', 0.25, 2.5, 800); // 두번째 웨이브 라인
      paintWave('rgb(219, 163, 102)', 0.6, 1.5, 500); // 세번째 웨이브 라인

      // paint.t 업데이트 후 리페인트
      paint.seconds += 0.014;
      paint.t = paint.seconds * Math.PI;
      setTimeout(paint, 35);
    };

    // paint 리셋
    paint.seconds = 0;
    paint.t = 0;

    const init = () => {
      canvas = canvasRef.current;
      context = canvas.getContext('2d');
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      context.scale(2, 2);
      height = canvas.height;
      width = canvas.width;
      xAxis = Math.floor(height / 5);
      yAxis = 0;

      paint();
    };

    init();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Line;
