export class Firebase {

    constructor(){


        this.dbConnect()
    }

    dbConnect(){

        const firebaseConfig = {
            apiKey: "AIzaSyCjBxXHifuF9_UkSk0yaPqFHkqmwxtacIc",
            authDomain: "whatsapp-clone-f87d8.firebaseapp.com",
            projectId: "whatsapp-clone-f87d8",
            storageBucket: "whatsapp-clone-f87d8.appspot.com",
            messagingSenderId: "169531466935",
            appId: "1:169531466935:web:ab1ffa544ca3c81366d932"
          };
          

          if(!this._initialized){

             // Initialize Firebase
             firebase.initializeApp(firebaseConfig);
            
             firebase.firestore().settings({
                timestampsSnapshots: true
             })

            }
            
            this._initialized = true
    }

 

    static db(){

        //realtime database
        return firebase.firestore();

    }

    static hd(){

        //cloud, firebaseStorage -> arquivos
        return firebase.firestorage();

    }



}