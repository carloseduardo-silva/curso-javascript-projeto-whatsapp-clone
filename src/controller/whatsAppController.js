import {cameraController} from './cameraController'
import {Format} from './../util/format'
import {documentPreviewController} from './documentPreviewController'
import {audioController} from './audioController'
import { Firebase } from './../util/fireBase'
import { User } from '../model/User'

export default class whatsAppController{

    constructor(){

        this._firebase = new Firebase()
        this.initAuth();
       this.elementsProtoType();
       this.loadElements();
       this.initEvents();
       this.testdb()


      
    }
    testdb(){
        this._firebase.dbConnect()
    }

    initAuth(){
        this._firebase.initAuth().then((response) =>{

             
            this._user = new User(response.user.email);

            let userRef = User.findByEmail(response.user.email)

            userRef.set({
                name: response.user.displayName,
                email: response.user.email,
                photo: response.user.photoURL

            })
            
            console.log('Usuario Logado com Sucesso', response)
            this.el.appContent.css({
                display:'flex'
            })

        }).catch(err =>{

            console.log(err)
        })
    }


    // loading all the elements with id, setting then as a atributte in camelCase.
    loadElements(){

       this.el = {};

       let ids = document.querySelectorAll('[id]')

       
       ids.forEach(element =>{

     
        this.el[Format.getCamelCase(element.id)] = element;

       })}

    
    elementsProtoType(){

        Element.prototype.hide = function(){
            this.style.display = 'none'
            return this;
        }

        Element.prototype.show = function(){
            this.style.display = 'block'
            return this;

        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none'

            return this;
        }

        Element.prototype.on = function(events, fn){

            events.split(" ").forEach(event =>{
                
                this.addEventListener(event, fn)


            })
            return this;
          
        }

        Element.prototype.css = function(styles){

            for( let name in styles){
                this.style[name] = styles[name]

            }
            return this;}

        Element.prototype.addClass = function(name){
            this.classList.add(name)
            return this;

        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name)
            return this;

        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name)
            return this;

        }

        Element.prototype.containsClass = function(name){
            return this.classList.contains(name)

        }

        HTMLFormElement.prototype.getForm = function(){

            return new FormData(this)

        }

        HTMLFormElement.prototype.toJSON = function(){

           let json = {}

           this.getForm().forEach((value, key) =>{

            json[key] = value

           })
           return json;

        }
        


       }
    
    initEvents(){

        this.el.myPhoto.on('click', e=>{

            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()
            setTimeout(()=>{ this.el.panelEditProfile.addClass('open');}, 300)

        })


        this.el.btnNewContact.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelAddContact.show()
            setTimeout(()=>{ this.el.panelAddContact.addClass('open');}, 300)
            
        })

        this.el.btnClosePanelEditProfile.on('click', e =>{

             this.el.panelEditProfile.removeClass('open')


        })

        this.el.btnClosePanelAddContact.on('click', e =>{

            this.el.panelAddContact.removeClass('open')


       })

       this.el.photoContainerEditProfile.on('click', e=>{
            this.el.inputProfilePhoto.click()
       })

       this.el.inputNamePanelEditProfile.on('keypress', e=>{
        
        if(e.key === 'Enter'){

            e.preventDefault()

            this.el.btnSavePanelEditProfile.click()
        }
       })

       this.el.btnSavePanelEditProfile.on('click', e =>{
            console.log(this.el.inputNamePanelEditProfile.innerHTML)
       })

       this.el.formPanelAddContact.on('submit', e=>{

        e.preventDefault();

        let formData = new FormData(this.el.formPanelAddContact)

       })

       this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item =>{

        item.on('click',()=>{

            this.el.main.css({
                display: 'flex'
            })
            this.el.home.hide()


        })

       })

       this.el.btnAttach.on('click', e=>{
        e.stopPropagation();
        this.el.menuAttach.addClass('open');
        document.addEventListener('click', this.closeMenuAttach.bind(this))
        })

       this.el.btnAttachPhoto.on('click', e=>{
        this.el.inputPhoto.click();
       })

       this.el.inputPhoto.on('change', e=>{

            console.log(this.el.inputPhoto.files)

            let arr = [...this.el.inputPhoto.files]
            
            arr.forEach(file =>{
            console.log(file)

            })


       })

       this.el.btnAttachCamera.on('click', e=>{

            this.el.panelMessagesContainer.hide()
            this.el.panelCamera.addClass('open')
            this.el.panelCamera.css({
                height: '103%'
            })

            this._camera = new cameraController(this.el.videoCamera);
       })

       this.el.btnClosePanelCamera.on('click', e=>{

            this.el.panelCamera.removeClass('open')
            this.el.panelMessagesContainer.show()
            this._camera.stop()


       })

       this.el.btnTakePicture.on('click', e=>{

        console.log('diga x')

        let dataUrl = this._camera.takePicture()
        this.el.pictureCamera.src = dataUrl;
        this.el.pictureCamera.show()
        this.el.videoCamera.hide()
        this.el.btnReshootPanelCamera.show()
        this.el.containerTakePicture.hide()
        this.el.containerSendPicture.show()

       })

        this.el.btnReshootPanelCamera.on('click', e=>{
        this.el.pictureCamera.hide()
        this.el.videoCamera.show()
        this.el.btnReshootPanelCamera.hide()
        this.el.containerTakePicture.show()
        this.el.containerSendPicture.hide()


       })

       this.el.btnSendPicture.on('click', e=>{

        console.log(this.el.pictureCamera.src + ' picture taked!')

        this.el.pictureCamera.hide()
        this.el.videoCamera.show()
        this.el.btnReshootPanelCamera.hide()
        this.el.containerTakePicture.show()
        this.el.containerSendPicture.hide()
        this.el.panelCamera.removeClass('open')
        this.el.panelMessagesContainer.show()

       })

       this.el.btnAttachDocument.on('click', e=>{

        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.addClass('open')
        this.el.panelDocumentPreview.css({
            height: '95%',
            width:'100%'
        })
        this.el.inputDocument.click()

       })

       this.el.inputDocument.on('change', e=>{

        if(this.el.inputDocument.files[0]){

            let file =  this.el.inputDocument.files[0];

            this._docPreviewController = new documentPreviewController(file);


            this._docPreviewController.getPreviewData().then(result=>{
                console.log(result)
                this.el.imgPanelDocumentPreview.src = result.src;
                this.el.infoPanelDocumentPreview.innerHTML= result.info
                this.el.imagePanelDocumentPreview.show()
                this.el.filePanelDocumentPreview.hide()
                
               

            }).catch(e =>{
                console.log(e)
                console.log(file.type)
                switch(file.type){

                    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls'

                    break;

                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc'

                    break;
                    
                    case"application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt'
                  
                    break;

                    default:
                    this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic'
                    break;

                }

                this.el.filenamePanelDocumentPreview.innerHTML = file.name
                this.el.imagePanelDocumentPreview.hide()
                this.el.filePanelDocumentPreview.show()
            })

            
        }


       })


       this.el.btnClosePanelDocumentPreview.on('click', e=>{
        this.el.panelMessagesContainer.show()
        this.el.panelDocumentPreview.removeClass('open')
       })

       this.el.btnSendDocument.on('click', e=>{
        console.log('enviando document ...')


       })

       this.el.btnAttachContact.on('click', e=>{

        this.el.modalContacts.show()

       })

       this.el.btnCloseModalContacts.on('click', e=>{
        this.el.modalContacts.hide()

       })

       this.el.btnSendMicrophone.on('click', e=>{

        this.el.recordMicrophone.show()
        this.startTimerAudio()

        this._audioController = new audioController()

        this._audioController.on('rady', (musica)=>{

            console.log('ready event', musica)
            this._audioController.startRecorder()
        });


       })

       this.el.btnCancelMicrophone.on('click', e=>{
        this._audioController.stopRecorder()
        this.closeRecordMicrophone()

       })

       this.el.btnFinishMicrophone.on('click', e=>{
        this._audioController.stopRecorder()
        this.closeRecordMicrophone()
        
       })

       this.el.inputText.on('keyup', e=>{
    
        if(this.el.inputText.innerHTML.length){

            this.el.inputPlaceholder.hide()
            this.el.btnSendMicrophone.hide()
            this.el.btnSend.show()
        }
        else{
            this.el.inputPlaceholder.show()
            this.el.btnSendMicrophone.show()
            this.el.btnSend.hide()

        }

        


       })

       this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML)

       })

       this.el.inputText.on('keypress', e=>{

        if(e.key === 'Enter' && !e.ctrlKey){
            e.preventDefault()
           this.el.btnSend.click()

        }

       

        })

        this.el.btnEmojis.on('click', e=>{

            this.el.panelEmojis.toggleClass('open')
     

        })

        this.el.panelEmojis.querySelectorAll('.emojik').
            forEach(emoji=>{

            emoji.on('click', e=>{

                console.log(emoji.dataset.unicode)

                
                let img = this.el.imgEmojiDefault.cloneNode()

                img.style.cssText = emoji.style.cssText
                img.dataset.unicode = emoji.dataset.unicode
                img.alt = emoji.dataset.unicode

                emoji.classList.forEach(classe => {

                    img.classList.add(classe)

                })

            let cursor = window.getSelection()

            if(!cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                this.el.inputText.focus()
                cursor = window.getSelection()
            }

            let range = document.createRange()

            range = cursor.getRangeAt(0);
            range.deleteContents();

            let frag = document.createDocumentFragment();

            frag.appendChild(img)

            range.insertNode(frag);

            range.setStartAfter(img)

            this.el.inputText.dispatchEvent(new Event('keyup'))
            })

        })


    }

    startTimerAudio(){

     
        let start = Date.now()

        this._recordMicInterval = setInterval(()=>{

            let time = Date.now() - start
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(time);

        }, 1000)

    }


    closeRecordMicrophone(){

        this.el.recordMicrophone.hide()
        this.el.btnSendMicrophone.show()
        clearInterval(this._recordMicInterval)
        

    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide()
        this.el.panelEditProfile.hide()

    }
    


    closeMenuAttach(){

        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open')

    }




}