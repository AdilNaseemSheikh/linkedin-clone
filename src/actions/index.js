import db, { auth, provider, storage } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        dispatch({ type: "SET_USER", payload: result.user });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
}

export function postArticleApi(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      const upload = storage
        .ref(`image/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          if (snapshot.state === "RUNNING") {
          }
        },
        (err) => console.log(err.message),
        async () => {
          const downloadUrl = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: "",
              title: "",
              date: "",
            },
            image: downloadUrl,
          });
        }
      );
    }
  };
}
