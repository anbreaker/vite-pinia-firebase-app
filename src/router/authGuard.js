import { useUserStore } from '../stores/user';

export const isAuthenticatedGuard = async (to, from, next) => {
  const userStore = useUserStore();

  userStore.loadingSession = true;

  const user = await userStore.currentUser();

  if (user) next();
  else next({ name: 'login' });

  userStore.loadingSession = false;
};
