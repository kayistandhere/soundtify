<template>
  <div class="loading"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {	
  50% { 
    background: rgb(255, 255, 255);
  } 
}

html {
  height: 100%;
}

body {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #333333;
}

.loading {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 0.25rem solid rgba(255, 255, 255, 0.2);
  border-top-color: rgb(255, 255, 255);
  animation: spin 1s infinite linear;
}

.loading--double {
  border-style: double;
  border-width: 0.5rem;
}

.loading-pulse {
  position: relative;
  width: 6px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  animation: pulse 750ms infinite;
  animation-delay: 250ms;
}

.loading-pulse:before, .loading-pulse:after {
  content: '';
  position: absolute;
  display: block;
  height: 16px;
  width: 6px;
  background: rgba(255, 255, 255, 0.2);
  top: 50%;
  transform: translateY(-50%);
  animation: pulse 750ms infinite;
}

.loading-pulse:before {
  left: -12px;
}

.loading-pulse:after {
  left: 12px;
  animation-delay: 500ms;
}
</style>