<template>
  <div :class="$style.panel">
    PanelContainer
    <div>
      <select name="sortBy" id="sortBy" @change="handleCurrentList($event)">
        <option disabled selected value="">Please select one</option>
        <option
          v-for="option in options"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
    <div v-if="patientsState.loading">Loading....</div>
    <ul v-if="!patientsState.loading">
      <li v-for="(user, key) in currentList" :key="user.id">
        {{ user }}<br />{{ key }}
      </li>
    </ul>
  </div>
</template>

<script>
import useData from '@/_composables/useData';
import useMedicinesForPatientsAbove30Year from '@/_composables/useMedicinesForPatientsAbove30Year';
import useMedicinesForMalePatients from '@/_composables/useMedicinesForMalePatients';
import useAllPatients from '@/_composables/useAllPatients';
import { watch, onUpdated, computed, ref } from 'vue';

export default {
  name: 'PanelContainer',
  setup(props, { emit }) {
    const currentList = ref([]);

    const { patientsState } = useData();

    const {
      medicinesForPatientsAbove30Year,
      getMedicinesForPatientsAbove30Year,
    } = useMedicinesForPatientsAbove30Year(patientsState);

    const {
      medicinesForMalePatients,
      getMedicinesForMalePatients,
    } = useMedicinesForMalePatients(patientsState);

    const { allPatietns, getAllPatients } = useAllPatients(patientsState);

    function setCurrentList(data) {
      currentList.value = data.value;
    }

    function handleCurrentList(event) {
      const { value } = event.target;

      if (value === 'getAllPatients') {
        getAllPatients();
        setCurrentList(allPatietns);
      }
      if (value === 'getMedicinesForMalePatients') {
        getMedicinesForMalePatients();
        setCurrentList(medicinesForMalePatients);
      }
      if (value === 'getMedicinesForPatientsAbove30Year') {
        getMedicinesForPatientsAbove30Year();
        setCurrentList(medicinesForPatientsAbove30Year);
      }
    }

    watch(patientsState, (newState) => {
      console.log(newState);
      if (newState.loading === false) {
        getAllPatients();
        setCurrentList(allPatietns);
      }
    });

    // console.log(allPatietns);

    onUpdated(() => {
      console.log('updated!');
      console.log(currentList);
    });

    return {
      allPatietns,
      handleCurrentList,
      currentList,
      patientsState,
    };
  },
  data() {
    return {
      selected: 'getAllPatients',
      options: [
        { text: 'getAllPatients', value: 'getAllPatients' },
        {
          text: 'getMedicinesForMalePatients',
          value: 'getMedicinesForMalePatients',
        },
        {
          text: 'getMedicinesForPatientsAbove30Year',
          value: 'getMedicinesForPatientsAbove30Year',
        },
      ],
    };
  },
};
</script>

<style lang="scss" module>
.panel {
  max-width: 1400px;
  width: 100%;
}
</style>
