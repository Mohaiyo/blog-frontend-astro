<template>
  <div id="count-down-app" class="count-down-app" :style="{
    backgroundImage: `url(${weddingBg.src})`
  }">
    <h1 ref="headingRef" v-show="!messageVisible" >{{ currentYear }} 06 18</h1>
    <div ref="appRef" v-show="!messageVisible"   class="countdown-timer">
      <div class="count-down">
        <div class="timer">
          <h2 class="days">{{ format(time.days) }}</h2>
          <small>Days</small>
        </div>
        <div class="timer">
          <h2 class="hours">{{ format(time.hours) }}</h2>
          <small>Hours</small>
        </div>
        <div class="timer">
          <h2 class="minutes">{{ format(time.minutes) }}</h2>
          <small>Minutes</small>
        </div>
        <div class="timer">
          <h2 class="seconds">{{ format(time.seconds) }}</h2>
          <small>Seconds</small>
        </div>
      </div>
    </div>
    <div ref="messageRef" v-show="messageVisible" class="message" >Happy {{ diff }} Wedding Anniversary, Honey!</div>
    <div ref="yearRef" class="year">{{ getNewYear().getFullYear() + '' }}</div>
  </div>
</template>

<script setup lang="ts" client>
  import { onMounted, ref } from 'vue'
  import weddingBg from '@assets/wedding-bg.png'

  const time = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const currentYear = ref(new Date().getFullYear())

  const messageVisible = ref(false)

  const timeRemaining = ref(0)
  const diff = ref(0)

  function start() {
    //  setup a timer
    const intervalId = setInterval(() => {
      // update the timer
      timeRemaining.value -= 1000
      // calculate the remaining time
      const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
      // update the time object
      time.value = {
        days,
        hours,
        minutes,
        seconds
      }
      if (timeRemaining.value < 0) {
        // call the callback
        complete()

        // clear the interval if expired
        clearInterval(intervalId)
      }
    }, 1000)
  }

  const yearRef = ref<HTMLDivElement>()
  const appRef = ref<HTMLDivElement>()
  const messageRef = ref<HTMLDivElement>()

  const headingRef = ref<HTMLHeadingElement>()

  const complete = () => {
    messageVisible.value = true
    // restart the countdown after showing the
    // greeting message for a day ()
    setTimeout(
      () => {
        messageVisible.value = false
        setExpiredDate(getNewYear())
      },
      1000 * 60 * 24
    )
  }


  function setExpiredDate(expiredDate: Date) {
    diff.value = expiredDate.getFullYear() - 2019
    currentYear.value = expiredDate.getFullYear()
    // get the current time
    const currentTime = new Date().getTime()
    // calculate the remaining time
    timeRemaining.value = expiredDate.getTime() - currentTime
    timeRemaining.value > 0 ? start() : complete()
  }


  const getNewYear = () => {
    
    return new Date(`June 18 ${currentYear.value} 19:04:00`)
  }

  const format = (t: number) => {
    return t < 10 ? '0' + t : t
  }

  onMounted(() => {
    setExpiredDate(getNewYear())
  })
</script>

<style scoped>

  #count-down-app {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.8;
    margin-top: 20px;
    color: #fff;
    /* background */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    /* layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    @apply rounded-xl h-[100vh];
  }

  #count-down-app h1 {
    font-size: 60px;
    margin: -80px 0 40px;
    color: #fff;
  }
  #count-down-app h2 {
    color: #fff;
  }

  .count-down {
    text-align: center;
    font-size: 40px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px;
  }

  .timer h2 {
    margin: 0 0 20px;
    font-size: 4rem;
  }

  .message {
    font-size: 50px;
    font-size: bold;
  }

  #count-down-app small {
    padding-top: 5px;
    font-size: 1.2rem;
    text-transform: uppercase;
    display: block;
  }

  .year {
    font-size: 200px;
    z-index: 0;
    opacity: 0.4;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translateX(-50%);
    margin: 0;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 22px;
    }

    .timer {
      margin: 5px;
    }

    .timer h2 {
      font-size: 30px;
      margin: 0;
      text-align: center;
    }

    .timer small {
      font-size: 12px;
    }

    .year {
      font-size: 100px;
    }

    .message {
      font-size: 20px;
    }
  }
</style>
