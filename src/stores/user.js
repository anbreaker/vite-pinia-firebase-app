import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { defineStore } from 'pinia';

import router from '../router';
import { auth } from '../../firebaseConfig';
import { useFireStoreDB } from './firestoreDB';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),

  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        this.userData = {
          email: user.email,
          uid: user.uid,
        };
      } catch (error) {
        console.error(error.code);

        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;

      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        this.userData = {
          email: user.email,
          uid: user.uid,
        };

        router.push({ name: 'home' });
      } catch (error) {
        console.error(error.code);

        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      const fireStoreDB = useFireStoreDB();

      try {
        await signOut(auth);

        this.userData = null;

        fireStoreDB.$reset();

        router.push({ name: 'login' });
      } catch (error) {
        console.error(error.code);

        return error.code;
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        // onAuthStateChanged retunr unsubscribe
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
            } else {
              this.userData = null;

              const fireStoreDB = useFireStoreDB();
              fireStoreDB.$reset();
            }

            resolve(user);
          },
          (error) => reject(error)
        );

        unsubscribe();
      });
    },
  },

  getters: {
    //
  },
});
