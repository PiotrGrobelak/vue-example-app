<template>
  <div :class="$style.searchBar">
    <p>Select a filtered list:</p>
    <Select v-bind="$props" />
  </div>
</template>

<script>
import Select from '@/components/atoms/Select';

export default {
  name: 'SearchBar',
  components: {
    Select,
  },
  props: {
    modelValue: String,
    handleCurrentList: Function,
  },
};
</script>

<style lang="scss" module>
.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  flex-wrap: wrap;
  p {
    font-size: 20px;
    margin-right: 20px;
  }
}
</style>
