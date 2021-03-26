import { ref } from 'vue';
import { getPatientsIds } from '@/_helpers/getPatientsIds';

export default function useAllPatients(patientsState) {
  const allPatietns = ref([]);

  // if I had more time I can spit logic to smaller helper functions for readable and DRY

  function getAllPatients() {
    const patientsIds = getPatientsIds(patientsState);
    allPatietns.value = [];

    patientsState.data.medicinesData.reduce((acc, medicine) => {
      medicine.patientIds.filter((patientId) => {
        if (
          allPatietns.value.some(
            (currentPatient) => currentPatient.patient.id === patientId,
          )
        ) {
          return allPatietns.value.find((existingPatient) => {
            return (
              existingPatient.patient.id === patientId &&
              existingPatient.medicines.push(medicine)
            );
          });
        }
        return (
          patientsIds.includes(patientId) &&
          allPatietns.value.push({
            patient: patientsState.data.patientsData.find(
              (patient) => patient.id === patientId,
            ),
            medicines: [medicine],
          })
        );
      });

      return acc;
    }, []);
  }

  return { allPatietns, getAllPatients };
}
