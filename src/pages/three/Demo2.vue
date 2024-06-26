<template>
  <div class="flex-all column">
    <div ref="threeDemo2" class="flex-1"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

defineOptions({
  name: 'threeDemo2',
});

const threeDemo2 = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// camera.position.z = 50;
camera.position.set(0, 3, 24);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 是否执行抗锯齿。默认为false
  // alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x160016, 1); // 设置背景颜色
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// 有这个则可以使用鼠标进行控制
const controls = new OrbitControls(camera, renderer.domElement);

const vertex = /* GLSL */ `
  uniform float uTime;
  uniform float PI;
  varying vec2 vUv;
  varying vec3 vColor;
  attribute float aSize;
  attribute vec4 aShift;

  void main() {
    vUv = uv;
    
    // 颜色处理
    vec3 color1 = vec3(227., 135., 0.); // 中心
    vec3 color2 = vec3(100., 50., 255.); // 两端
    // vec3(40., 10., 40.))对应的 xyz 是最远的xyz,没有任何一个点超过这个值;
    // 这里就是看当前点距离这个最远xyz的百分比,越靠近中心就是color1,越靠近最远xyz就是color2
    float d = length(abs(position) / vec3(40., 10., 40.));
    d = clamp(d, 0., 1.); // clamp 截取到 0~1
    vColor = mix(color1, color2, d) / 255.; // 混合后 除以255 保证值在 0~1 之间，为可用颜色值

    vec3 transformed = position;

    // 粒子小范围运动
    float theta = mod(aShift.x + aShift.z * uTime, PI * 2.);
    float phi = mod(aShift.y + aShift.z * uTime, PI * 2.);
    // 添加小范围运动向量
    transformed += vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta)) * aShift.w;

    // 位置处理
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0); // 有粒子小范围运动
    // vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); // 无粒子小范围运动

    // 大小处理
    // gl_PointSize = 7.0; // 大小固定
    // gl_PointSize = 100.0 / -mvPosition.z; // 采用倒数,近大远小
    gl_PointSize = aSize * 50.0 / -mvPosition.z;
    
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragment = /* GLSL */ `
  varying vec2 vUv;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    float mask = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vec3(vColor), mask);
  }
`;

const count1 = 20000; // 星球粒子数
const count2 = 30000; // sin带粒子数
const count3 = 60000; // 星云粒子数
const positions = [];
const sizes = [];
const shifts = [];
for (let i = 0; i < count1 + count2 + count3; i++) {
  // 随机粒子大小
  const size = Math.random() * 1.5 + 0.5; // 大小范围0.5-2.0
  sizes.push(size);

  // 粒子运动
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const angle = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
  const strength = Math.random() * 0.9 + 0.1; // 0.1-1
  shifts.push(theta, phi, angle, strength);

  // 球体部分
  if (i < count1) {
    // 球体
    const { x, y, z } = new THREE.Vector3()
      .randomDirection()
      .multiplyScalar(Math.random() * 0.5 + 9.5);

    // 自定义xyz位置
    // const r = Math.random() * 0.5 + 9.5;
    // const x = (Math.random() * 2 - 1) * 40  * Math.sin(theta);
    // const y = Math.sin(x);
    // const z = Math.sin(x) * Math.sin(theta);
    positions.push(x, y, z);
  } else if (i < count2) {
    // 半径15的位置有一条sin函数带
    const x = (Math.random() - 0.5) * 2 * 15; // x: -15~15
    const y = Math.sin(x); // y: x对应的sin函数值
    // 15^2 - x^2再开根号-保证是圆环；((i % 2) - 0.5) * 2-结果为 -1 | 1
    const z =
      Math.sqrt(225 - Math.min(Math.pow(x, 2) * 1.01, 225)) *
      ((i % 2) - 0.5) *
      2; // z: -15~15
    positions.push(x, y, z);
  } else {
    // 圆盘/圆柱部分
    const r = 18;
    const R = 40;
    const rand = Math.pow(Math.random(), 1.5);
    const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
    const { x, y, z } = new THREE.Vector3().setFromCylindricalCoords(
      radius, // 半径: r ~ R 的混合
      Math.random() * 2 * Math.PI, // 角度:0~2PI
      (Math.random() - 0.5) * 2 // 高度y:-1 ~ 1
    );
    positions.push(x, y, z);
  }
}

const geometry = new THREE.BufferGeometry();
geometry
  .setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  .setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1))
  .setAttribute('aShift', new THREE.Float32BufferAttribute(shifts, 4));

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    PI: { value: Math.PI },
  },
  // size: 0.4,
  // color: 0xffffff,
  // wireframe: true, // 是否线框模式
  vertexShader: vertex, // 顶点着色器
  fragmentShader: fragment, // 片元着色器
  transparent: true, // 透明度是否生效
  blending: THREE.AdditiveBlending, // 粒子重叠后的颜色会变白发亮
  depthTest: false, // 避免粒子黑边的效果
});
const points = new THREE.Points(geometry, material);
points.rotation.order = 'ZYX';
points.rotation.z = 0.1;
scene.add(points);

// TIPS: 处理动画
const requestID = ref('');
const clock = new THREE.Clock();

function animate() {
  requestID.value = requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  material.uniforms.uTime.value = time;
  points.rotation.y = time * 0.02; // 自转设置-y轴、0.1倍time的速度

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
  renderer.setSize(threeDemo2.value.clientWidth, threeDemo2.value.clientHeight);
  threeDemo2.value.appendChild(renderer.domElement);

  start();
});

onUnmounted(() => {
  stop();
});
</script>

<style lang="less" scoped></style>
