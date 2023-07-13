class cameraController{

    constructor(videoEl){

        this._videoEl = videoEl

        navigator.mediaDevices.getUserMedia({
            video: true

        }).then(stream =>{

            this._videoEl.src = URL.createObjectURL(stream);
            this._videoElplay()

        }).catch(err =>{
            console.log(err + ' Certificate that you has a cam!')
        })

    }


}