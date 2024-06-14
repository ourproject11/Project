// Example: src/services/firestoreService.js
import { db } from '../firebase/firebase.config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Function to get documents from a Firestore collection
const getDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const docs = [];
  querySnapshot.forEach(doc => {
    docs.push({ id: doc.id, ...doc.data() });
  });
  return docs;
};

// Function to add a document to a Firestore collection
const addDocument = async (collectionName, document) => {
  const docRef = await addDoc(collection(db, collectionName), document);
  return docRef.id;
};

export { getDocuments, addDocument };
