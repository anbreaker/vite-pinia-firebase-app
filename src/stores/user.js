import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import { defineStore } from 'pinia';

import router from '../router';
import { auth, db } from '../../firebaseConfig';
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

        router.push({ name: 'home' });
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

        await this.setUser(user);

        router.push({ name: 'home' });
      } catch (error) {
        console.error(error.code);

        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },

    // TODO video 140, min 6.45
    async setUser(user) {
      try {
        const docRef = doc(db, 'users', user.uid);

        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        await setDoc(docRef, this.userData);
      } catch (error) {
        console.log(error);
      }
    },

    async logoutUser() {
      const fireStoreDB = useFireStoreDB();

      try {
        router.push({ name: 'login' });

        await signOut(auth);
      } catch (error) {
        console.error(error.code);

        return error.code;
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const fireStoreDB = useFireStoreDB();
        // onAuthStateChanged return unsubscribe
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              await this.setUser(user);
            } else {
              this.userData = null;

              fireStoreDB.$reset();
            }

            resolve(user);
          },
          (error) => reject(error)
        );

        unsubscribe();
      });
    },

    async updateUser(displayName) {
      try {
        const user = auth.currentUser;

        await updateProfile(user, { displayName });

        this.setUser(user);
      } catch (error) {
        console.log(error);

        return error.code;
      }
    },
  },

  getters: {
    //
  },
});
