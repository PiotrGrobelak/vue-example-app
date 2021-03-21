<template>
  <header :class="$style.header"><h1>Vue Project</h1></header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: $secondary-color;
  text-align: center;
  h1 {
    margin: 0;
  }
}
</style>
