import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { rotateCereal, getNewRandomCereal, addCerealRandomPlaced } from "/assets/scripts/cerealsUseful";
import { getRandomHEXColor } from "./useful";
import "./domController";


//DEFAULT VARIABLES

const hexColors = [];
const colorAmount = 6;
let colorCounter = 0;

while (colorCounter < colorAmount) {
  hexColors[colorCounter] = getRandomHEXColor();
  colorCounter++;
}


//CANVAS SETUP
const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const mainCamera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

const canvasBG = document.querySelector('#background');
const renderer = new THREE.WebGLRenderer({
  canvas: canvasBG
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
mainCamera.position.setZ(30);
mainCamera.position.setX(0);

renderer.render(scene, mainCamera);


//CANVAS ELEMENTS

//Background
//TODO: Change BG image
const spaceTexture = new THREE.TextureLoader().load('assets/images/bgImage.jpg');
scene.background = spaceTexture;


//Primary Cereal
const {cerealGeometry, cerealMaterial} = getNewRandomCereal(hexColors);
const primaryCerealItem = new THREE.Mesh(cerealGeometry, cerealMaterial);

scene.add(primaryCerealItem);


//Background Cereals
const amountBgCereals = 150;

let backgroundCereals = [];

let count = 0;
while (count < amountBgCereals) {
  backgroundCereals[count] = addCerealRandomPlaced(scene, hexColors);
  count++;
}


// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper(mainCamera);
scene.add(lightHelper, gridHelper, cameraHelper);


//Controls
// const controls = new OrbitControls(mainCamera, renderer.domElement);
// controls.autoRotate = true;
// controls.enableZoom = true;

//EVENTS

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  mainCamera.position.z = t * -0.07;
  // mainCamera.position.x = t * -0.0002;
  // mainCamera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  rotateCereal(primaryCerealItem);
  for (let bgCereal of backgroundCereals) {
    rotateCereal(bgCereal);
  }

  // controls.update();

  renderer.render(scene, mainCamera);
}

animate();