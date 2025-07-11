import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import { bleach } from "three/examples/jsm/tsl/display/BleachBypass.js";

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const particalTexture = textureLoader.load("/textures/3.png");
/**
 * Textures
 */

/**
 * BAse
 */

//Canvas
const canvas = document.querySelector(".webgl");

//Scene
const scene = new THREE.Scene();

/**
 * particals
 */

//geometry
const particalsGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particalsGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particalsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// console.log(positions);

//material
const particalsMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true, // close big --- far small
  color: "#ff88cc",
  transparent: true,
  alphaMap: particalTexture,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

//points
const particals = new THREE.Points(particalsGeometry, particalsMaterial);

scene.add(particals);

/**
 * particals
 */

/**
 * Sizes
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Sizes
 */

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Renderer
 */

/**
 * Animate Clock
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update particals
  // particals.rotation.y = elapsedTime * 0.2;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particalsGeometry.attributes.position.array[i3 + 0];
    particalsGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
  particalsGeometry.attributes.position.needsUpdate = true;
  //update controls
  controls.update();

  //Renderer
  renderer.render(scene, camera);

  //Call tick again on next frame
  window.requestAnimationFrame(tick);
};

tick();
/**
 * Animate Clock
 */
