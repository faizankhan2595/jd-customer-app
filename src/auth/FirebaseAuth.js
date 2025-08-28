import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from 'configs/FirebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase utils
const db = getFirestore(app);
const auth = getAuth(app);
const currentUser = auth.currentUser;
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const twitterAuthProvider = new TwitterAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {
	db,
	auth,
	currentUser,
	googleAuthProvider,
	facebookAuthProvider,
	twitterAuthProvider,
	githubAuthProvider
};