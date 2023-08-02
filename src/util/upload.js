import { Firebase } from './fireBase'

export class Upload {

    static send(file, from){

        return new Promise((s, f)=>{

            let updloadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file)

            updloadTask.on("state_changed", (e)=>{
                console.info(e)
             
            }, err =>{
    
               f(err)
    
            }, ()=>{
                    s(updloadTask.snapshot)
            });
        })

    }

}