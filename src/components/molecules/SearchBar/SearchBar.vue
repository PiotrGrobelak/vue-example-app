<template>
  <div>
    <p>Search:</p>
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

<style></style>
