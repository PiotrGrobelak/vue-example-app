import { maleNames } from '@/_staticData';

export function getMalePatients(patientsState) {
  const patientsMaleIds = [];

  patientsState.data.patientsData.filter((user) => {
    // all data from API have gender "male" parameter
    return maleNames.includes(user.name) && patientsMaleIds.push(user.id);
  });

  return patientsMaleIds;
}
