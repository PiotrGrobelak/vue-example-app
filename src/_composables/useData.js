import { getData } from '@/_services';

import { watch, reactive } from 'vue';

export default function useData() {
  const patientsState = reactive({
    data: {},
    loading: false,
    error: '',
  });

  async function loadData() {
    try {
      patientsState.loading = true;
      const patientsData = await getData();
      patientsState.data = patientsData;
    } catch (error) {
      const setError = new Error('Failed to get patients data');
      patientsState.error = setError;
    } finally {
      patientsState.loading = false;
    }
  }

  watch(() => loadData);

  loadData();

  return { patientsState };
}
