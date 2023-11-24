<template>
  <aside class="sidebar" data-sidebar>
    <div class="sidebar-info">
      <figure class="avatar-box">
        <img :src="avatar.src" alt="Wayne Liang" width="80" />
      </figure>

      <div class="info-content">
        <h1 class="name" title="Wayne Liang">Wayne Liang</h1>

        <p class="title">前端开发工程师</p>
      </div>

      <button class="info_more-btn" data-sidebar-btn>
        <span>展示联系方式</span>

        <ion-icon name="chevron-down"></ion-icon>
      </button>
    </div>

    <div class="sidebar-info_more">
      <div class="separator"></div>

      <ul class="contacts-list">
        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="mail-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">邮箱</p>

            <a href="mailto:mohaiyo@163.com" class="contact-link">mohaiyo@163.com</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="phone-portrait-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">手机号</p>

            <a href="tel:18578262007" class="contact-link">+86 18578262007</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="calendar-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">生日</p>

            <time datetime="1982-06-23">8 23, 1991</time>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="location-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">现居</p>

            <address>深圳市, 广东省, 中国</address>
          </div>
        </li>
      </ul>

      <div class="separator"></div>

      <ul class="social-list">
        <li class="social-item">
          <a href="#" class="social-link">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>

        <li class="social-item">
          <a href="#" class="social-link">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>

        <li class="social-item">
          <a href="#" class="social-link">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import avatar from '@assets/Monkey_D_Luffy.png'
console.log('avatar', avatar)
</script>

<style>

</style>
