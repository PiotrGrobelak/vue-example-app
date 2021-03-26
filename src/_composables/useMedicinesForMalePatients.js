import { ref } from 'vue';
import { getMalePatients } from '@/_helpers/getMalePatients';

export default function useMedicinesForMalePatients(patientsState) {
  const medicinesForMalePatients = ref([]);

  // if I had more time I can spit logic to smaller helper functions for readable and DRY

  function getMedicinesForMalePatients() {
    const patientsIds = getMalePatients(patientsState);

    medicinesForMalePatients.value = [];

    patientsState.data.medicinesData.reduce((acc, medicine) => {
      medicine.patientIds.filter((patientId) => {
        if (
          medicinesForMalePatients.value.some(
            (med) => med.medicine.id === medicine.id,
          )
        ) {
          medicinesForMalePatients.value.find((el) => {
            return (
              el.medicine.id === medicine.id &&
              patientsIds.includes(patientId) &&
              el.patients.push(
                patientsState.data.patientsData.find(
                  (pat) => pat.id === patientId,
                ),
              )
            );
          });
        } else if (patientsIds.includes(patientId)) {
          medicinesForMalePatients.value.push({
            medicine,
            patients: [
              patientsState.data.patientsData.find((el) => el.id === patientId),
            ],
          });
        }
        return patientId;
      });

      return acc;
    }, []);
  }

  return { medicinesForMalePatients, getMedicinesForMalePatients };
}
