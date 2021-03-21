<template>
  <footer :class="$style.footer"><p>Footer</p></footer>
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
  align-items: flex-end;
  height: 80px;
  background-color: $secondary-color;
  color: $primary-color;
}
</style>
