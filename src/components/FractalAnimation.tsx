import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface FractalAnimationProps {
  text?: string;
  className?: string;
}

const FractalAnimation: React.FC<FractalAnimationProps> = ({ 
  text = "Alberto & Mariona", 
  className = "" 
}) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let points: any[] = [];
      let snowflakes: Snowflake[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(sketchRef.current!);
        p.background(0, 0);
        p.angleMode(p.DEGREES);

        // Crear puntos simulando texto sin necesidad de fuente
        const textSize = p.min(p.width * 0.08, 120);
        const textX = p.width / 2;
        const textY = p.height / 2;
        
        // Simulamos los puntos del texto usando formas geométricas
        points = createTextPoints(p, text, textX, textY, textSize);

        // Crear copos de nieve para cada punto
        points.forEach(point => {
          snowflakes.push(new Snowflake(p, p.random(p.width), p.random(-p.height, 0), point));
        });
      };

      p.draw = () => {
        p.background(0, 20);

        // Actualizar y dibujar copos de nieve
        snowflakes.forEach(snowflake => {
          snowflake.applyBehaviors();
          snowflake.update();
          snowflake.display();
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      // Función para crear puntos simulando texto
      function createTextPoints(p: p5, text: string, x: number, y: number, size: number) {
        const points: any[] = [];
        const letterSpacing = size * 0.6;
        const totalWidth = text.length * letterSpacing;
        const startX = x - totalWidth / 2;
        
        for (let i = 0; i < text.length; i++) {
          const letterX = startX + i * letterSpacing;
          
          // Crear puntos para cada letra en forma de grid
          for (let dx = -size/3; dx <= size/3; dx += 8) {
            for (let dy = -size/3; dy <= size/3; dy += 8) {
              if (p.random() > 0.3) { // Densidad aleatoria
                points.push({
                  x: letterX + dx + p.random(-5, 5),
                  y: y + dy + p.random(-5, 5)
                });
              }
            }
          }
        }
        return points;
      }

      class Snowflake {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        target: p5.Vector;
        maxSpeed: number;
        maxForce: number;
        angle: number;
        size: number;
        p: p5;

        constructor(p: p5, x: number, y: number, targetPoint: any) {
          this.p = p;
          this.pos = p.createVector(x, y);
          this.vel = p.createVector(0, p.random(0.5, 2));
          this.acc = p.createVector();
          this.target = p.createVector(targetPoint.x, targetPoint.y);
          this.maxSpeed = p.random(3, 6);
          this.maxForce = p.random(0.08, 0.2);
          this.angle = 0;
          this.size = p.random(8, 20);
        }

        applyBehaviors() {
          const arriveForce = this.arrive(this.target);
          this.acc.add(arriveForce);
        }

        arrive(target: p5.Vector) {
          const desired = p5.Vector.sub(target, this.pos);
          const d = desired.mag();
          let speed = this.maxSpeed;
          
          if (d < 100) {
            speed = this.p.map(d, 0, 100, 0, this.maxSpeed);
          }
          
          desired.setMag(speed);
          const steer = p5.Vector.sub(desired, this.vel);
          steer.limit(this.maxForce);
          return steer;
        }

        update() {
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
          this.angle += this.vel.mag() * 0.05;
        }

        display() {
          this.p.push();
          this.p.translate(this.pos.x, this.pos.y);
          this.p.rotate(this.angle);
          
          // Gradiente de color basado en la distancia al objetivo
          const distance = p5.Vector.dist(this.pos, this.target);
          const alpha = this.p.map(distance, 0, 200, 255, 100);
          
          this.p.stroke(255, alpha);
          this.p.strokeWeight(1.2);
          this.p.noFill();
          
          this.drawFractal(0, 0, this.size);
          this.p.pop();
        }

        drawFractal(x: number, y: number, len: number) {
          if (len < 2) return;

          this.p.line(0, 0, 0, -len);
          this.p.push();
          this.p.translate(0, -len);

          for (let i = 0; i < 6; i++) {
            this.p.rotate(60);
            this.p.line(0, 0, 0, -len * 0.3);
            this.drawFractal(0, -len * 0.3, len * 0.6);
          }
          this.p.pop();
        }
      }
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [text]);

  return <div ref={sketchRef} className={`absolute inset-0 ${className}`} />;
};

export default FractalAnimation;