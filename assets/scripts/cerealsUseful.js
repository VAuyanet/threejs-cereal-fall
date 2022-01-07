import * as THREE from "three";
import {getRandomPosition} from "/assets/scripts/useful";


export function addCerealRandomPlaced(scene, hexColors) {
  const {cerealGeometry, cerealMaterial} = getNewRandomCereal(hexColors);
  const geometricItem = new THREE.Mesh(cerealGeometry, cerealMaterial);

  const x = getRandomPosition(-100);
  const y = getRandomPosition(-100);
  const z = getRandomPosition(-100);


  geometricItem.position.set(x, y, z);

  geometricItem.rotation.x += getRandomPosition(-100, 0.02);
  geometricItem.rotation.y += getRandomPosition(-100, 0.002);
  geometricItem.rotation.z += getRandomPosition(-100, 0.02);

  scene.add(geometricItem);

  return geometricItem;
}


export function rotateCereal(cereal) {
  cereal.rotation.x += 0.001;
  cereal.rotation.y += 0.0005;
  cereal.rotation.z += 0.001;
}

export function getNewRandomCereal(hexColors) {
  //Textures
  //TODO: Simplify textures reduce the time of response
  const cerealMap = new THREE.TextureLoader().load('assets/images/moon.jpg');
  const cerealTexture = new THREE.TextureLoader().load('assets/images/moonTexture.jpg');

  // Starting cereal
  const cerealGeometry = new THREE.TorusGeometry(2, 0.9, 16, 100);

  const randomPosition = getRandomPosition(0, hexColors.length-1);

  const cerealColor = hexColors[randomPosition];

  const cerealMaterial = new THREE.MeshStandardMaterial({
    color: cerealColor,
    // map: cerealMap,
    // normalMap: cerealTexture,
  });

  return {
    cerealGeometry,
    cerealMaterial
  }
}