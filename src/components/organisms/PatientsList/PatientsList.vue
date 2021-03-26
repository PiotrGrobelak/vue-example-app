<template>
  <ul :class="$style.list">
    <li
      v-for="item in renderPatients"
      :key="item.patient.id"
      :class="$style['list-item']"
    >
      <div :class="$style['list-item-information']">
        <h2 :class="$style['list-item-information-title']">
          Pateint Information
        </h2>
        <div :class="$style['list-item-information-content']">
          <span>Patient: </span>
          <span>
            {{ item.patient.name }}
            -
            {{ item.patient.lastName }}
          </span>
        </div>
        <div :class="$style['list-item-information-content']">
          Age:
          <span>
            {{ item.patient.age }}
          </span>
        </div>
        <div :class="$style['list-item-information-content']">
          Adress:
          <span>
            {{ item.patient.adress }}
          </span>
        </div>
        <div :class="$style['list-item-information-content']">
          Phone:
          <span>
            {{ item.patient.phoneNumber }}
          </span>
        </div>
      </div>
      <ul :class="$style['medicines-list']">
        <h3 :class="$style['medicines-list-title']">Medicines</h3>
        <li
          :class="$style['medicines-list-item']"
          v-for="medicine in item.medicines"
          :key="medicine.id"
        >
          <span> {{ medicine.medicationName }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PatientsList',
  props: {
    renderPatients: Array,
  },
};
</script>

<style lang="scss" module>
.list {
  width: 100%;
  &-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    min-height: 420px;
    padding: 20px 30px;
    margin-top: 20px;
    @include border;
    &-information {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: 440px;
      width: 100%;
      padding-right: 40px;
      &-title {
        margin-top: 20px;
      }
      &-content {
        padding: 14px 0;
      }
    }
  }
}
.medicines-list {
  &-title {
    font-size: 20px;
    text-align: center;
  }
  &-item {
    display: flex;
    span {
      padding: 10px 0;
    }
  }
}
</style>
