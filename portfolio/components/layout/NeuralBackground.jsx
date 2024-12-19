"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: null, y: null });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 1.5 + 1;
      this.originX = x;
      this.originY = y;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.density = Math.random() * 30 + 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > dimensions.width) this.speedX *= -1;
      if (this.y < 0 || this.y > dimensions.height) this.speedY *= -1;

      if (mouseRef.current.x != null && mouseRef.current.y != null) {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
          this.x += forceDirectionX * force * 2;
          this.y += forceDirectionY * force * 2;
        }
      }
    }

    draw(ctx) {
      ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = () => {
    const particles = [];
    const numberOfParticles = Math.floor(
      (dimensions.width * dimensions.height) / 25000
    );

    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(
        new Particle(
          Math.random() * dimensions.width,
          Math.random() * dimensions.height
        )
      );
    }

    particlesRef.current = particles;
  };

  const connect = (ctx) => {
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;

        if (distance < maxDistance) {
          const opacity = 0.3 * (1 - distance / maxDistance);
          ctx.strokeStyle = `rgba(100, 100, 100, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    particlesRef.current.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });

    connect(ctx);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initParticles();
      animate();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 -z-10"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  );
};

export default NeuralBackground;
