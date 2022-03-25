const checkPermission = (permission, role) => {
  const permissionList = JSON.parse(role && role.permission);
  return permissionList[permission] === true;
};

export default checkPermission;
