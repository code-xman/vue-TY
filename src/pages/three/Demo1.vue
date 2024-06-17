<template>
  <div class="flex-all column">
    <div ref="threeDemo1" class="flex-1"></div>
    <!-- <div class="btns flex-0 flex x-end pt-10">
      <el-button type="primary" @click="start">启动</el-button>
      <el-button type="warning" @click="stop">停止</el-button>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

defineOptions({
  name: 'threeDemo1',
});

const threeDemo1 = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 是否执行抗锯齿。默认为false
  // alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(0xe6fcf5, 1); // 设置背景颜色
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// 有这个则可以使用鼠标进行控制
const controls = new OrbitControls(camera, renderer.domElement);

const vertex = /* GLSL */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// TIPS: 1
const fragment_1 = /* GLSL */ `
  varying vec2 vUv;

  void main() {
    vec3 color1 = vec3(0.2, 0.6, 0.8);
    vec3 color2 = vec3(0.6, 0.4, 0.6); 
    float mixer = fract((vUv.x + vUv.y) * 5.0);
    vec3 color = mix(color1, color2, mixer);
    // 物体颜色
    gl_FragColor = vec4(color, 1.0);
  }
`;
const geometry_1 = new THREE.SphereGeometry(15, 32, 16);
const material_1 = new THREE.ShaderMaterial({
  // color: 0x119911, // 颜色
  // wireframe: true, // 是否线框模式
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_1, // 片元着色器
});
const mesh_1 = new THREE.Mesh(geometry_1, material_1);
mesh_1.position.x = -25; // 设置物体mesh_1的x位置
scene.add(mesh_1);

// TIPS: 2
const fragment_2 = /* GLSL */ `
  varying vec2 vUv;
  
  uniform float uTime;

  void main() {
    // vec3 color1 = vec3(0.2, 0.6, 0.8);
    // vec3 color2 = vec3(0.6, 0.4, 0.6); 
    vec3 color1 = vec3(1.0, 1.0, 0.0);
    vec3 color2 = vec3(0.0, 1.0, 1.0); 
    
    // float mixer = abs(vUv.x + vUv.y - 1.0);
    float mixer = 1.0 - abs(vUv.x + vUv.y - 1.0);
    vec3 color = mix(color1, color2, mixer);
    // 物体颜色
    gl_FragColor = vec4(color, 1.0);
  }
`;
const geometry_2 = new THREE.PlaneGeometry(10, 10);
const material_2 = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_2, // 片元着色器
});
const mesh_2 = new THREE.Mesh(geometry_2, material_2);
mesh_2.position.y = 0; // 设置物体mesh_2的x位置
scene.add(mesh_2);

// TIPS: 3
const fragment_3 = /* GLSL */ `
  varying vec2 vUv;

  uniform float uTime;

  void main() {
    // 绘制圆形
    float dist = length(fract(vUv * 3.0) - vec2(0.5));
    // float radius = 0.5;
    float radius = 0.5 * (sin(uTime + vUv.x + vUv.y) + 1.0) * 0.5;
    gl_FragColor = vec4(step(radius, dist), 0.8, 0.8, 1.0);
  }
`;
const geometry_3 = new THREE.BoxGeometry(10, 10, 10);
const material_3 = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_3, // 片元着色器
});
const mesh_3 = new THREE.Mesh(geometry_3, material_3);
mesh_3.position.y = -20;
scene.add(mesh_3);

// TIPS: 4
const fragment_4 = /* GLSL */ `
  varying vec2 vUv;

  uniform float uTime;

  void main() {
    // 绘制圆形
    // float dist = length(fract(vUv * 8.0) - vec2(0.5));
    // 绘制环形
    float dist = fract((length(vUv.y - vec2(0.5)) / 0.707 + uTime * 0.02) * 5.0);
    // float radius = 0.5;
    float radius = 0.5 * (sin(uTime) + 1.0) * 0.5;
    gl_FragColor = vec4(step(radius, dist), 1.0, 1.0, 1.0);
    // gl_FragColor = vec4(step(0.5, dist), 0.9, 0.8, 1.0);
  }
`;
const geometry_4 = new THREE.SphereGeometry(15, 32, 16);
const material_4 = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_4, // 片元着色器
});
const mesh_4 = new THREE.Mesh(geometry_4, material_4);
mesh_4.position.x = 25;
scene.add(mesh_4);

// TIPS: 5
const fragment_5 = /* GLSL */ `
  varying vec2 vUv;
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(0.0, 0.6, 0.3);
  
  void main() {
    float mask1 = step(0.5, fract(vUv.x * 3.0));
    float mask2 = step(0.5, fract(vUv.y * 3.0));
    float mixer = abs(mask1 - mask2);
    vec3 color = vec3(mix(color1,color2, mixer));
    // 物体颜色
    gl_FragColor = vec4(color, 1.0);
  }
`;
const geometry_5 = new THREE.PlaneGeometry(10, 10);
const material_5 = new THREE.ShaderMaterial({
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_5, // 片元着色器
});
const mesh_5 = new THREE.Mesh(geometry_5, material_5);
mesh_5.position.y = 30; // 设置物体mesh_5的x位置
scene.add(mesh_5);

// TIPS: 6
const fragment_6 = /* GLSL */ `
  varying vec2 vUv;
  vec3 color1 = vec3(0.0, 0.4, 0.7);
  vec3 color2 = vec3(1.0, 0.6, 0.3);
  
  void main() {
    float mask1 = floor(vUv.x * 6.0) / 12.0;
    float mask2 = floor(vUv.y * 6.0) / 12.0;
    float mixer = abs(mask1 + mask2);
    vec3 color = vec3(mix(color1,color2, mixer));
    // 物体颜色
    gl_FragColor = vec4(color, 1.0);
  }
`;
const geometry_6 = new THREE.PlaneGeometry(10, 10);
const material_6 = new THREE.ShaderMaterial({
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment_6, // 片元着色器
});
const mesh_6 = new THREE.Mesh(geometry_6, material_6);
mesh_6.position.y = 15; // 设置物体mesh_6的x位置
scene.add(mesh_6);




// TIPS: 处理动画
const requestID = ref('');
const time = ref(0.05);

function animate() {
  time.value += 0.05;
  material_2.uniforms.uTime.value = time.value;
  material_3.uniforms.uTime.value = time.value;
  material_4.uniforms.uTime.value = time.value;

  requestID.value = requestAnimationFrame(animate);

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

const start = () => {
  if (requestID.value) {
    ElMessage.warning('已经启动');
    return;
  }
  animate();
};

const stop = () => {
  cancelAnimationFrame(requestID.value);
  requestID.value = '';
};

onMounted(() => {
  renderer.setSize(threeDemo1.value.clientWidth, threeDemo1.value.clientHeight);
  threeDemo1.value.appendChild(renderer.domElement);

  start();
  // stop();
});

onUnmounted(() => {
  stop();
})
</script>

<style lang="less" scoped></style>
