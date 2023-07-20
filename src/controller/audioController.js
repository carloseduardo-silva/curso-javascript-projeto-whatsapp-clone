import { classEvent } from "../util/classEvent"

export class audioController extends classEvent{

    constructor(){

        super();

        this._available = false
        this._mimeType = 'audio/webm'

        navigator.mediaDevices.getUserMedia({
            audio: true

        }).then(stream =>{

            this._stream = stream
            this._available = true
            console.log(this._stream)


            this.trigger('ready', audio)

        }).catch(err =>{
            console.log(err + ' Certificate that you have a microphone!')
        })

    }
    
    isAvailable(){
        return this._available
    }

    stop(){
        //getTracks seleciona a camera/video/audio mas nao consegue e retorna undefined pois o pc nao possui camera/video. --> logo necessita ser tratado.
         if(this._stream === undefined){
             return console.log('Certificate that you have a mic!')
 
         }
         else{
             this._stream.getTracks().forEach(track =>{
                 track.stop()
             })}
 
 
 
     }

     startRecorder(){

        if (this.isAvailable()){

           this._mediaRecorder = new MediaRecorder(this._stream, {
            mimeType:this._mimeType})

           this._recordedChunks = [];

           this._mediaRecorder.addEventListeners('dataavailable', e=>{
            if(e.data.size > 0) this._recordedChunks.push(e.data);

           })

           this._mediaRecorder.addEventListener('stop', e=>{

            let blob = new Blob(this._recordedChunks, {
                type: this._mimeType
            })

            let filename = `rec${Date.now()}.webm`

            let file = new File([blob], filename, {
                type:this._mimeType,
                lastModified: Date.now()

            })

            console.log('file', file)

            let reader = new FileReader();

            reader.onload = e =>{

                let audio = new Audio(reader.result)
                audio.play();
            }

            reader.readAsDataURL(file)

           })
        }
        this._mediaRecorder.start()
     }

     stopRecorder(){
        if (this.isAvailable()) {

            this._mediaRecorder.stop()

            this.stop()
             
        }


     }
}