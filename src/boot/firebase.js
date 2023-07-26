import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPrRZm025ocjnjJFofuH-cFAPHKIa0nLg",
  authDomain: "vuetodo-35b60.firebaseapp.com",
  projectId: "vuetodo-35b60",
  storageBucket: "vuetodo-35b60.appspot.com",
  messagingSenderId: "182087231855",
  appId: "1:182087231855:web:990ec6b4a94f12d5aaa09a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const collectName = "tolists";

// Create Data
const createData = async (content, category, status, time) => {
  try {
    const docRef = await addDoc(collection(db, collectName), {
      content: content,
      category: category,
      done: status,
      createdAt: time
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log("Error adding document: ", e);
  }
};

// Delete Data
const deleteData = async (id) => {
  await deleteDoc(doc(db, collectName, id));
};

// Read Data
const readData = async () => {
  try {
    const queryDatas = await getDocs(collection(db, collectName));
    const allDatas = [];

    queryDatas.forEach((doc) => {
      allDatas.push({ id: doc.id, data: doc.data() });
    });
    return allDatas;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Update Data
const updateData = async (id, newCont) => {
  try {
    const docRef = doc(db, collectName, id);
    await updateDoc(docRef, newCont);
  } catch (e) {
    console.log(e);
  }
};

export default boot(({ app }) => {
  // Tambahkan instance db ke dalam object `app.config.globalProperties`
  // sehingga Anda dapat mengaksesnya dari seluruh komponen dengan `this.$db`
  app.config.globalProperties.$db = {
    createData,
    readData,
    updateData,
    deleteData
  };
});
