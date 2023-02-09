
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser && (currentUser.roles.includes('admin') || currentUser.roles.includes('superAdmin')),
    canClient: currentUser && currentUser.roles.includes('client'),
    canDriver: currentUser && currentUser.roles.includes('driver'),
    canSuperAdmin: currentUser && currentUser.roles.includes('superAdmin')
  };
}
