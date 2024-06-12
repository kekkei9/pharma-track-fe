import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, query, where, getDocs, collection, deleteField, updateDoc, FieldValue, connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSFGGWAyiRJw-Y0epjvqwXVZY7PwXuVyA",
  authDomain: "pharma-track-5affa.firebaseapp.com",
  projectId: "pharma-track-5affa",
  storageBucket: "pharma-track-5affa.appspot.com",
  messagingSenderId: "526216682993",
  appId: "1:526216682993:web:89933dc18ecc1d67e87850",
  measurementId: "G-1J1B3S6C72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const firestore = getFirestore(app);
const firestore = initializeFirestore(app, {experimentalAutoDetectLongPolling: true})
// firestore.settings({ experimentalForceLongPolling: true })
// connectFirestoreEmulator(firestore, 'localhost', 8080)
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const getUidByStaffId = async (staffId) => {
	const usersRef = collection(firestore, 'users')
	const q = query(usersRef, where("id_staff", "==", staffId));
	const snapshot = await getDocs(q);
	const tempData = []
	snapshot.forEach((doc) => tempData.push(doc.data()))
	return tempData[0];
} 

export const updateUserInfo = async(userID, info) =>{
	const userRef = doc(firestore, `users/${userID}`);
	const snapshot = await getDoc(userRef);
	await setDoc(userRef, {...snapshot.data(), ...info});
}

export const setUserInfo = async (userID, info) => {
	const userRef = doc(firestore, `users/${userID}`);
	await setDoc(userRef, info);
};

export const checkUserInfoExist = async (uid) => {
	const userRef = doc(firestore, `users/${uid}`);
	const snapshot = await getDoc(userRef);
	return snapshot.exists();
};

export const getUserRole = async (uid) => {
	const userRef = doc(firestore, `users/${uid}`);
	const snapshot = await getDoc(userRef);
	return snapshot.get('role')
}

export const getUserData = async (uid) => {
	const userRef = doc(firestore, `users/${uid}`);
	const snapshot = await getDoc(userRef);
	return snapshot.data()
}

export const deleteUserProp = async (uid, propName) => {
	const userRef = doc(firestore, `users/${uid}`);
	await updateDoc(userRef, {[propName]: deleteField()})
}

export const popUpWithGoogle = async () => {
	const { user } = await signInWithPopup(auth, googleProvider);
	const { uid } = user;
	const isExist = await checkUserInfoExist(uid);
	return { user, isExist };
};

export const popUpWithFacebook = async () => {
	const { user } = await signInWithPopup(auth, facebookProvider);
	const { uid } = user;
	const isExist = await checkUserInfoExist(uid);
	return { user, isExist };
}

export const createUserUsingEmailPassword = async ({ email, password, role, ...rest }) => {
	if (!email || !password || !role) return;
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	const { uid } = user;
	await setUserInfo(uid, { uid, role, email, ...rest });
	return user;
};

export const signInUsingEmailPassword = async (email, password) => {
	if (!email || !password) return;
	const { user } = await signInWithEmailAndPassword(auth, email, password);
	return user;
};

export const signOutUser = async () => {
	await signOut(auth);
};
