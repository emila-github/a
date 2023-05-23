<template>
  <img
    :src="logo"
    class="headerpic"
    alt="PICC 中国人保财险"
  />
</template>

<script>
import logo from '@/assets/logo-title.png'
export default {
  data() {
    return {
      logo,
    }
  },
}
</script>

<style scoped lang="scss">
.headerpic {
  width: 100%;
}
</style>
