const checkPermission = (permission: string, role: any) => {
  const permissionList = JSON.parse(role && role.permission);
  return permissionList[permission] === true;
};

export default checkPermission;
