import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import router from '../router';

import { auth } from '../../firebaseConfig';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
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
        console.log(error);
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
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);

        this.userData = null;

        router.push({ name: 'register' });
      } catch (error) {
        console.log(error);
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
