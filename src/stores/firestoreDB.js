import { defineStore } from 'pinia';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

import { auth, db } from '../../firebaseConfig';
import router from '../router';

export const useFireStoreDB = defineStore('fireStoreDB', {
  state: () => ({
    documents: [],
    loadingDocs: false,
    loading: false,
  }),

  actions: {
    async getUrls() {
      if (this.documents.length !== 0) return;

      try {
        this.loadingDocs = true;

        const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          this.documents.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDocs = false;
      }
    },

    async addUrl(name) {
      try {
        this.loading = true;

        const objDoc = {
          name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, 'urls'), objDoc);

        this.documents.push({
          ...objDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error.code);

        return error.code;
      } finally {
        this.loadingDocs = false;
        this.loading = false;
      }
    },

    async readUrl(id) {
      try {
        const docRef = doc(db, 'urls', id);

        const docSnap = await getDoc(docRef);

        await this.checkUserAuth(docSnap);

        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDocs = false;
      }
    },

    async editUrl(id, name) {
      try {
        const docRef = doc(db, 'urls', id);

        const docSnap = await getDoc(docRef);

        await this.checkUserAuth(docSnap);

        await updateDoc(docRef, {
          name: name,
        });

        this.documents = this.documents.map((item) => (item.id === id ? { ...item, name } : item));

        router.push({ name: 'home' });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDocs = false;
      }
    },

    async deleteUrl(id) {
      try {
        this.loading = true;

        const docRef = doc(db, 'urls', id);

        const docSnap = await getDoc(docRef);

        await this.checkUserAuth(docSnap);

        await deleteDoc(docRef);

        this.documents = this.documents.filter((doc) => doc.id !== id);
      } catch (error) {
        console.log(error.message);

        return error.message;
      } finally {
        this.loadingDocs = false;
        this.loading = false;
      }
    },

    async checkUserAuth(docSnap) {
      if (!docSnap.exists()) {
        throw new Error('Could not find doc!');
      }

      if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error('This document is not authorized');
      }
    },
  },

  getters: {
    //
  },
});
