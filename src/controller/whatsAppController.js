class whatsAppController{

    constructor(){

       this.elementsProtoType();
       this.loadElements();
       this.initEvents();


      
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

       })
       this.el.btnAttachCamera.on('click', e=>{

       })
       this.el.btnAttachDocument.on('click', e=>{

       })
       this.el.btnAttachContact.on('click', e=>{

       })
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