export function getPatientsIdsAbove30Year(patientsState) {
  const patientsIds = [];

  patientsState.data.patientsData.filter((user) => {
    // console.log('go');
    return user.age > 30 && patientsIds.push(user.id);
  });

  return patientsIds;
}
