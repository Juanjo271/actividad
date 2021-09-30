import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import gsap from 'gsap';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

/* 
    Actividad
    - Cambiar imagenes por modelos(puede ser el mismo modelo)
    - Limitar el scroll
 */
    let car1;

    let directionalLight;
let light;
let light2;
let light3;
let light4;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,

);
const renderer = new THREE.WebGLRenderer();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
 

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
if(mouse.y){}

});

let y = 0;
let position = 0;

let objs = [];

document.body.onload = () => {
  main();
};

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

window.addEventListener('wheel', onMouseWheel);

function main() {
  // Configurracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  camera.position.x = 0;
 /* camera.position.y=Math.min(Math.max(parseInt(y),1),2);*/
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);
  

  // Lights
  setupLights();

  // Imagenes
  //loadImages();

  animate();


  // modelo 
  let loader = new GLTFLoader();

  for(let i=0;i<4;i++){
loader.load(`/assets/${i}/scene.gltf`,
function (gltf) {     
  car1 = gltf.scene.children[0];
  car1.scale.set(0.1,0.1,0.1) ;
 car1.position.set(Math.random() + 0, i * -1.8);
  scene.add(gltf.scene);
  scene.traverse((object) => {
    if (object.isMesh) objs.push(object);
  });
  animate();
},
function (xhr) {
  console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
},
function (error) {
  console.log('Un error ocurrio');
},
);

  }
}
  




/*
function loadImages() {
  // Loader de Textura
  const textureLoader = new THREE.TextureLoader();

  const geometry = new THREE.PlaneBufferGeometry(1, 1.3);

  for (let i = 0; i < 4; i++) {
    const material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(`/assets/${i}.jpg`),
    });

    const img = new THREE.Mesh(geometry, material);
    img.position.set(Math.random() + 0.3, i * -1.8);

    scene.add(img);
  }

  scene.traverse((object) => {
    if (object.isMesh) objs.push(object);
  });
}*/

function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}

function setupLights() {
  directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  /*light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);*/

 /* light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);*/

  /*light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);*/

  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function onMouseWheel(event) {
  y = -event.deltaY * 0.0007;

}

function updateElements() {
position += y;

  y *= 0.9;

  // Raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);

  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 20, y: 20,z:20 });
    gsap.to(intersect.object.rotation, { y:90 });
    gsap.to(intersect.object.rotation, { x:90 });
    gsap.to(intersect.object.position, { z: 0 });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x:10, y: 10,z: 10});
      gsap.to(object.rotation, { y: 90 });
      gsap.to(object.rotation, { x: 90 });
      gsap.to(object.position, { z: 0 });
    }
  }
 

if(position>0.34164531952257104){
position=0.34164531952257104;
}
else if (position<-4.875797733396092){
  position=-4.875797733396092;
}
  camera.position.y = position;
}

