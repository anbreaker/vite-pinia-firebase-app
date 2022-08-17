import { defineStore } from 'pinia';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite';

import { auth, db } from '../../firebaseConfig';
import { nanoid } from 'nanoid';

export const useFireStoreDB = defineStore('fireStoreDB', {
  state: () => ({
    documents: [],
    loadingDocs: false,
  }),

  actions: {
    async getUrls() {
      // if (this.documents.length > 0) return;

      try {
        this.loadingDocs = true;

        const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid));

        const querySnapshot = await getDocs(q);

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
  },

  getters: {
    //
  },
});
