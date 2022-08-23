import { defineStore } from 'pinia';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

import { auth, db } from '../../firebaseConfig';
import { nanoid } from 'nanoid';

export const useFireStoreDB = defineStore('fireStoreDB', {
  state: () => ({
    documents: [],
    loadingDocs: false,
  }),

  actions: {
    async getUrls() {
      if (this.documents.length !== 0) return;

      try {
        this.loadingDocs = true;

        const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);

        querySnapshot.forEach((doc) => {
          this.documents.push({
            ...doc.data,
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
        console.log(error);
      } finally {
        this.loadingDocs = false;
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

    async editUrl(id) {},

    async deleteUrl(id) {
      try {
        const docRef = doc(db, 'urls', id);

        const docSnap = await getDoc(docRef);

        await this.checkUserAuth(docSnap);

        await deleteDoc(docRef);

        this.documents = this.documents.filter((doc) => doc.id !== id);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDocs = false;
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
