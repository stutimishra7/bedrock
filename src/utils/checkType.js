export const checkUserType = (userdata) => {
  // only 0 or x = instructor
  // only 0 = instructor
  // only 1 = student
  // both 12 = student and instructor
  try {
    if (userdata.roleType) {
      const roles = userdata.roleType
      if (roles.includes(0)) {
        if (roles.includes(1)) {
          return '12'
        } else {
          return '0'
        }
      }

      if (roles.includes(1)) {
        if (roles.includes(0)) {
          return '12'
        } else {
          return '1'
        }
      }
      return '0'
    } else {
      return 'x'
    }
  } catch (error) {
    return '0'
  }
}
