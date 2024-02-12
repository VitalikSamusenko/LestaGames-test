import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import background from "../assets/images/background.png";
import "../assets/styles/style.scss";

import init from "./init";

const MODEL_URL = new URL(
  "../assets/model/t-34-85_3d-model.glb",
  import.meta.url
);

const { sizes, camera, scene, canvas, controls, renderer } = init();

let cursorX = 0,
  cursorY = 0;

scene.background = new THREE.TextureLoader().load(background);

const loader = new GLTFLoader();
loader.load(MODEL_URL.href, (glft) => {
  scene.add(glft.scene);
  animate();
});

const findCursorPosition = (event) => {
  cursorX = event.clientX - window.innerWidth / 2;
  cursorY = event.clientY - window.innerHeight / 2;
  console.log(cursorX, cursorY);
};

renderer.domElement.addEventListener("pointermove", findCursorPosition);

function animate() {
  requestAnimationFrame(animate);

  camera.position.x += cursorX * 0.00003;
  camera.position.y += -cursorY * 0.00003;
  camera.position.z = 6;
  camera.lookAt(scene.position);

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  // Обновляем размеры
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Обновляем соотношение сторон камеры
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Обновляем renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});
