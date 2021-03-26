<template>
  <ul :class="$style.medicinesList">
    <li
      :class="$style['medicinesList-item']"
      v-for="item in renderMedicines"
      :key="item.medicine.id"
    >
      <div :class="$style['medicinesList-item-wrapper']">
        <header>
          <h2>Medicine</h2>
          <p>{{ item.medicine.medicationName }}</p>
        </header>
        <div>
          <h3>Patients</h3>
          <ul>
            <li v-for="patient in item.patients" :key="patient.id">
              <span> {{ patient.name }} {{ patient.lastName }} </span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MedicinesList',
  props: {
    renderMedicines: Array,
  },
};
</script>

<style lang="scss" module>
.medicinesList {
  margin-top: 20px;
  &-item {
    padding: 20px 30px;
    margin-top: 20px;
    min-height: 200px;
    @include border;
    &-wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
