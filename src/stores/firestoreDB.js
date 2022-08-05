import { defineStore } from 'pinia';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

import { auth, db } from '../../firebaseConfig';

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
  },

  getters: {
    //
  },
});
