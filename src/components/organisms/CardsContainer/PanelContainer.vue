<template>
  <div :class="$style.panel">
    <div>
      <SearchBar v-model="selected" :handleCurrentList="handleCurrentList" />
    </div>
    <div v-if="patientsState.loading">Loading....</div>
    <!-- <ul v-if="!patientsState.loading && !patientsState.error">
      <li v-for="(user, key) in currentList" :key="user.id">
        {{ user.patient }}<br />{{ key }}
        {{ user.patients }}
        <div>{{ user.medicine }}</div>
      </li>
    </ul> -->
    <!-- </ul> -->
    <ul v-if="renderPatients.length > 0">
      <li v-for="item in renderPatients" :key="item.id">
        {{ item.patient.name }}
        <div v-for="medicine in item.medicines" :key="medicine.id">
          <p>{{ medicine.medicationName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchBar from '@/components/molecules/SearchBar';
import useData from '@/_composables/useData';
import useMedicinesForPatientsAbove30Year from '@/_composables/useMedicinesForPatientsAbove30Year';
import useMedicinesForMalePatients from '@/_composables/useMedicinesForMalePatients';
import useAllPatients from '@/_composables/useAllPatients';
import { watch, onUpdated, computed, ref } from 'vue';

export default {
  name: 'PanelContainer',
  components: {
    SearchBar,
  },
  setup() {
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

    const renderMedicines = computed(() => {
      return currentList.value.filter((item) => {
        return item.medicines;
      });
    });

    const renderPatients = computed(() => {
      return currentList.value.filter((item) => {
        return item.patient;
      });
    });

    watch(patientsState, (newState) => {
      // console.log(newState);
      if (newState.loading === false) {
        getAllPatients();
        setCurrentList(allPatietns);
      }
    });

    onUpdated(() => {
      console.log('updated!');
      console.log(renderPatients.value.length);
      console.log(currentList);
    });

    return {
      handleCurrentList,
      currentList,
      patientsState,
      allPatietns,
      renderPatients,
    };
  },
  data() {
    return {
      selected: 'getAllPatients',
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
