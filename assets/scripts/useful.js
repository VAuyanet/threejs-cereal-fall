import * as THREE from "three";


export function getRandomPosition(minimumValue = 0, maximumValue = 100) {
  return THREE.MathUtils.randInt (minimumValue, maximumValue);
}

export function getRandomHEXColor() {
  return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, 'F');
}