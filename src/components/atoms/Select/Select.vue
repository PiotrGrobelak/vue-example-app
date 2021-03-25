<template>
  <select
    name="sortBy"
    v-model="selected"
    id="sortBy"
    @change="handleCurrentList($event)"
  >
    <option v-for="option in options" :key="option.text" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: String,
    handleCurrentList: Function,
  },
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });
    return {
      selected,
    };
  },
  data() {
    return {
      options: [
        { text: 'All patients', value: 'getAllPatients' },
        {
          text: 'Medicines for male',
          value: 'getMedicinesForMalePatients',
        },
        {
          text: 'Medicines for patients above 30 year',
          value: 'getMedicinesForPatientsAbove30Year',
        },
      ],
    };
  },
};
</script>

<style></style>
