class FormSubmit {
    constructor(configuracoes) {
        this.configuracoes = configuracoes;
        this.form = document.querySelector(configuracoes.form);
        this.formButton = document.querySelector(configuracoes.button);
        if(this.for){
            this.url = this.form.getAttribute("action")
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess(){
        this.form.innerHTML = this.settings.success;
    }

    displayError(){
        this.form.innerHTML = this.settings.success;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelector("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
            
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";

    }

    async sendForm(event){
       try{
        this.onSubmission(event);
       await fetch(this.url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
             body: JSON.stringify(this.getFormObject()),
           
        });
        this.displaySuccess();
    } catch (error){
        this.displayError();
        throw new Error(error);
    }
    }

    init() {
        if(this.form) this.formButton.addEventListener("click", this.sendForm());
        return this;

     }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h2 class='success'>Obrigada! Sua Mensagem foi enviada! :)</h2>",
    error: "<h2 class='error'>Error! Falha ao enviar sua mensagem. :(</h2>",
});
formSubmit.init();