<template>
  <van-icon name="wap-home" size="18" @click="toHome" />
</template>

<script>
export default {
  name: 'WapHome',
  methods: {
    toHome() {
      this.$router.replace({
        name: 'Home',
      })
    },
  },
}
</script>

<style></style>
