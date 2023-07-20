export class Firebase {

    constructor(){


        this.dbConnect();
        this.initAuth()
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
          
          
          if(!window._initializedFirebase){
              
              // Initialize Firebase
              firebase.initializeApp(firebaseConfig);
              
              firebase.firestore().settings({
                  timestampsSnapshots: true
                })

            }
            
            window._initializedFirebase = true
        }
        
        static db(){
            
            //realtime database
            return firebase.firestore();
            
        }
        
        static hd(){
            
            //cloud, firebaseStorage -> arquivos
            return firebase.firestorage();
            
        }
        
        
        initAuth(){
            return new Promise((resolve, reject) =>{
               
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider)
                .then(result =>{
                    
                    let token = result.credential.accessToken;
                    
                    let user = result.user;
                    resolve({
                        user,
                        token
                    });
                })
                .catch(err=>{
                    reject(err);
                });
            })
        }
        
    }