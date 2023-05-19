var contactForm;
var defaultWidget;

var friendlyCaptchaSolved = function (solution) {
    elements = contactForm.getElementsByClassName('showtransition');
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        el.classList.remove("invisible");        
    }
    document.getElementById('friendlyCaptchaFormSubmit').removeAttribute('disabled');
};

var validateForm = function() {
    var ret = true;
    var name = document.getElementsByName('name')[0];
    var phone = document.getElementsByName('phone')[0];
    var email = document.getElementsByName('email')[0];
    var message = document.getElementsByName('message')[0];
    var newsletter = document.getElementsByName('newsletter')[0];

    email.setCustomValidity("");
    message.setCustomValidity("");
    newsletter.setCustomValidity("");
    
    if(!email.checkValidity()){
        email.setCustomValidity("Indirizzo email non valido (richiesto)");
        email.reportValidity();
        ret = false;
    }
    // a message or newsletter subscription request are required (or both)
    if( message.value.length == 0 && !newsletter.checked){
        message.setCustomValidity("Inserisci un messaggio o richiedi l'iscrizione alla newsletter")
        newsletter.setCustomValidity("Inserisci un messaggio o richiedi l'iscrizione alla newsletter")
        message.reportValidity();
        newsletter.reportValidity();
        ret = false;
    }
    if(ret){
        return {
            name: name.value,
            phone: phone.value,
            email: email.value,
            message: message.value,
            newsletter : newsletter.checked
        }
    }
    return ret;
}

window.addEventListener("load", () => {
    defaultWidget = friendlyChallenge.autoWidget;
    contactForm = document.getElementById("contactForm");
    document.getElementById("friendlyCaptchaFormSubmit").addEventListener("click", submitEvent => {
        document.getElementById("form-response").innerHTML = "";
        var validatedData = validateForm();
        if(validatedData !== false){
            var XHR = new XMLHttpRequest();
            frcsolution = document.getElementsByName('frc-captcha-solution')[0].value;
            var aData = [
                `frc-captcha-solution=${encodeURIComponent(frcsolution)}`
            ];
            for(const [name, value] of Object.entries(validatedData)) {
                // encValue = encodeURIComponent(value);
                aData.push(`${name}=${encodeURIComponent(value)}`);
            };
            // Define what happens on successful data submission
            XHR.addEventListener('load', (event) => {
                var data = JSON.parse(XHR.responseText);
                if (data.errors != undefined && data.errors.length > 0) {
                    data.errors.forEach(element => {
                        errrow = document.createElement('div'); 
                        errrow.classList.add('alert', 'alert-warning');
                        errrow.innerHTML = element;
                        document.getElementById("form-response").append(errrow);
                    });
                } else {
                    let name = data.name;
                    successmsg = document.createElement('div'); 
                    successmsg.classList.add("alert", "alert-info", "text-center");
                    successmsg.innerText = `Grazie ${name}! Ti contatteremo presto.`;
                    document.getElementById('form-response').append(successmsg);
                    document.getElementById('contactForm').querySelectorAll('input,textarea').forEach(el => { el.value = ""; });
                    defaultWidget.reset();
                }
            });
            // Define what happens in case of an error
            XHR.addEventListener('error', (event) => {
                alert('Oops! Something went wrong.');
            });
            // Set up our request
            XHR.open('POST', '/cgi/form_contact');
            // Send our FormData object; HTTP headers are set automatically
            XHR.send(aData.join("&"));
        }else{ // invalid form
            successmsg = document.createElement('div');
            successmsg.classList.add("alert", "alert-warning", "text-center");
            successmsg.innerText = `Ricontrolla i dati`;
            document.getElementById('form-response').append(successmsg);
        }
        submitEvent.preventDefault();
    });
});