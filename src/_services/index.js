import axios from 'axios';

import { API } from '@/API';

export const getData = async () => {
  const patientsResponse = await axios.get(API.PATIENTS);
  const medicinesResponse = await axios.get(API.MEDICINES);

  const response = axios
    .all([patientsResponse, medicinesResponse])
    .then(
      axios.spread((patients, medicines) => {
        const patientsData = patients.data;
        const medicinesData = medicines.data;

        return { patientsData, medicinesData };
      }),
    )
    .catch((er) => {
      console.log(er);
    });

  return response;
};
