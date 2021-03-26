<template>
  <div :class="$style.panel">
    <SearchBar v-model="selected" :handleCurrentList="handleCurrentList" />
    <div v-if="patientsState.loading">Loading....</div>
    <div v-if="patientsState.error">{{ patientsState.error }}</div>

    <div :class="$style['panel-list']">
      <PatientsList
        v-if="
          !patientsState.loading &&
          !patientsState.error &&
          renderPatients.length > 0
        "
        :renderPatients="renderPatients"
      />
      <MedicinesList
        v-else-if="
          !patientsState.loading &&
          !patientsState.error &&
          renderMedicines.length > 0
        "
        :renderMedicines="renderMedicines"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/molecules/SearchBar';
import PatientsList from '@/components/organisms/PatientsList';
import MedicinesList from '@/components/organisms/MedicinesList';
import useData from '@/_composables/useData';
import useMedicinesForPatientsAbove30Year from '@/_composables/useMedicinesForPatientsAbove30Year';
import useMedicinesForMalePatients from '@/_composables/useMedicinesForMalePatients';
import useAllPatients from '@/_composables/useAllPatients';
import { watch, onUpdated, computed, ref } from 'vue';

export default {
  name: 'PanelContainer',
  components: {
    SearchBar,
    PatientsList,
    MedicinesList,
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

    const renderPatients = computed(() => {
      return currentList.value.filter((item) => {
        return item.patient;
      });
    });

    const renderMedicines = computed(() => {
      return currentList.value.filter((item) => {
        return item.medicine;
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
      // console.log(renderMedicines.value.length);
      // console.log(currentList.value);
      console.log(renderMedicines);
    });

    return {
      handleCurrentList,
      patientsState,
      renderPatients,
      currentList,
      renderMedicines,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin-top: 100px;
  padding: 0 20px;
  @include border;
  &-list {
    margin: 10px;
  }
}
</style>
