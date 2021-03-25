export function getPatientsIds(patientsState) {
  const patientsIds = [];

  patientsState.data.patientsData.filter((user) => {
    return patientsIds.push(user.id);
  });

  return patientsIds;
}
