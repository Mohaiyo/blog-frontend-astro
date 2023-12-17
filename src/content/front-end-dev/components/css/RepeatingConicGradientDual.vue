<template>
  <div>
    <button class="dual-box">Awesome Border Animation</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  .dual-box {
    padding: 10px;
    height: 50px;
    border: none;
    outline: none;
    appearance: none;
    background: repeating-conic-gradient(
      from var(--angle),
      #ff2700 0%,
      #ff2700 5%,
      transparent 5%,
      transparent 40%,
      #ff2700 50%
    );
    animation: dualAnimation 4s linear infinite;
    color: #fff;
    position: relative;
    z-index: 0;
    border-radius: 12px;
  }

  .dual-box::before {
    content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: repeating-conic-gradient(from var(--angle), #17f3fd 5%, #17f3fd 10%, transparent 10%, transparent 45%, #17f3fd 55%);
      animation: dualAnimation 4s linear infinite;
      left: 0;
      top: 0;
      z-index: -2;
      border-radius: 12px;
  } 

  .dual-box::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: #232323;
    border: 2px solid #232323;
    z-index: -1;
    border-radius: 12px;
  }

  

  @keyframes dualAnimation {
    0% {
      --angle: 0deg;
    }
    100% {
      --angle: 360deg;
    }
  }
</style>
