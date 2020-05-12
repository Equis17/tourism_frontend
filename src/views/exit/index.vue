<template>
  <div></div>
</template>

<script>
  export default {
    name: 'index',
    created() {
      this.$store.dispatch('user/resetToken')
      .then(() => {
        this.$router.push('/home')
      })
    },
  }
</script>

<style scoped>

</style>
