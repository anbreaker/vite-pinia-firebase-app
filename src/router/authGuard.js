import { useUserStore } from '../stores/user';
import { useFireStoreDB } from '../stores/firestoreDB';

export const isAuthenticatedGuard = async (to, from, next) => {
  const userStore = useUserStore();

  userStore.loadingSession = true;

  const user = await userStore.currentUser();

  if (user) next();
  else next({ name: 'login' });

  userStore.loadingSession = true;
};

export const redirectToShort = async (to, from, next) => {
  const firestoreDB = useFireStoreDB();
  const userStore = useUserStore();

  const url = await firestoreDB.getUrlShort(to.params.pathMatch[0]);

  if (!url) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = url;
    userStore.loadingSession = true;
    next();
  }
};
