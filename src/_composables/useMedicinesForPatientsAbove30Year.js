import { ref } from 'vue';
import { getPatientsIdsAbove30Year } from '@/_helpers/getPatientsIdsAbove30Year';

export default function useMedicinesForPatientsAbove30Year(patientsState) {
  const medicinesForPatientsAbove30Year = ref([]);

  // if I had more time I can spit logic to smaller helper functions for readable and DRY

  function getMedicinesForPatientsAbove30Year() {
    const patientsIds = getPatientsIdsAbove30Year(patientsState);

    medicinesForPatientsAbove30Year.value = [];

    patientsState.data.medicinesData.reduce((acc, medicine) => {
      medicine.patientIds.filter((patientId) => {
        if (
          medicinesForPatientsAbove30Year.value.some(
            (med) => med.medicine.id === medicine.id,
          )
        ) {
          medicinesForPatientsAbove30Year.value.find((el) => {
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
          medicinesForPatientsAbove30Year.value.push({
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

  return {
    medicinesForPatientsAbove30Year,
    getMedicinesForPatientsAbove30Year,
  };
}
