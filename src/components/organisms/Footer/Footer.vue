<template>
  <footer :class="$style.footer"><p>Vue first look :)</p></footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" module>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: $secondary-color;
}
</style>
