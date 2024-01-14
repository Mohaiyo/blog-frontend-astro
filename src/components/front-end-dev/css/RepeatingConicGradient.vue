<template>
  <div>
    <button class="box">Awesome Border Animation</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  .box {
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
    animation: animation 4s linear infinite;
    color: #fff;
    position: relative;
    z-index: 0;
    border-radius: 12px;
  }

  .box::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: #232323;
    border: 2px solid #232323;
    z-index: -1;
    border-radius: 12px;
  }

  @keyframes animation {
    0% {
      --angle: 0deg;
    }
    100% {
      --angle: 360deg;
    }
  }
</style>
