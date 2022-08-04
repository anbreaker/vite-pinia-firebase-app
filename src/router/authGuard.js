import { useUserStore } from '../stores/user';

export const isAuthenticatedGuard = async (to, from, next) => {
  const userStore = useUserStore();

  const user = await userStore.currentUser();

  if (user) next();
  else next({ name: 'login' });
};
