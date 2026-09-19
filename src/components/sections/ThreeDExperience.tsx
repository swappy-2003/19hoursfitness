"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ThreeDExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check reduced motion or small screens
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth < 768) {
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch {
      setIsSupported(false);
      return;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Electric Cyan Point Light
    const cyanLight = new THREE.PointLight(0x00e5ff, 5, 20);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Create 3D Sculptural Form: A stylized metallic athletic monolith / torus knot representing "19" & continuous discipline
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1d24,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse movement micro-interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll-driven rotation
    const anim = gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      x: Math.PI * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Render loop
    let animationFrameId: number;
    const render = () => {
      mesh.rotation.y += 0.003;
      mesh.rotation.x += (mouseY - mesh.rotation.x) * 0.05;
      mesh.rotation.z += (mouseX - mesh.rotation.z) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();

      // Clean disposal
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[75vh] md:min-h-[85vh] bg-[#08090B] py-24 px-6 md:px-12 flex items-center justify-center border-t border-white/[0.06] overflow-hidden select-none"
    >
      {/* 3D Canvas Background */}
      {isSupported && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />
      )}

      {/* Foreground Content */}
      <div className="relative z-10 max-w-2xl text-center space-y-6">
        <SectionLabel number="07" label="BIOMECHANICAL HARMONY" className="justify-center" />

        <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
          THE ART OF KINETIC FORCE.
        </h2>

        <p className="text-sm md:text-base text-[#969BA3] font-light leading-relaxed">
          Form follows function. In our training philosophy, every repetition aligns kinetic energy, structural posture, and muscular tension for injury-free longevity.
        </p>

        <div className="inline-flex items-center gap-4 text-xs font-mono tracking-widest text-[#00E5FF] pt-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>PRECISION BIOMECHANICS · VIRAR WEST</span>
        </div>
      </div>
    </section>
  );
}
