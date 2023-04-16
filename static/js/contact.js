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
            var aData = []
            for(const [name, value] of Object.entries(validatedData)) {
                // encValue = encodeURIComponent(value);
                aData.push(`${name}=${encodeURIComponent(value)}`);
            };
            // Define what happens on successful data submission
            XHR.addEventListener('load', (event) => {
                var data = JSON.parse(XHR.responseText);
                // console.log(JSON.stringify(data));
                if (data.errors != undefined && data.errors.length > 0) {
                    data.errors.forEach(element => {
                        errrow = new HTMLElement(); errrow.innerHTML = `<div class="alert alert-warning">${element}</div>`;
                        document.getElementById("form-response").append(errrow);
                    });
                } else {
                    let name = data.name;
                    successmsg = new HTMLElement(); successmsg.innerHTML = `<div class="alert alert-info text-center">Grazie ${name}! Ti contatteremo presto.</div>`;
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
            // $.ajax({
            //     type: "POST",
            //     url: "/cgi/form_contact",
            //     data: data,
            //     dataType: "json",
            //     success: function (data) {
            //         console.log(JSON.stringify(data));
            //         if (data.errors != undefined && data.errors.length > 0) {
            //             data.errors.forEach(element => {
            //                 errrow = $(`<div class="alert alert-warning">${element}</div>`);
            //                 $("#form-response").append(errrow);
            //             });
            //         } else {
            //             let name = data.name;
            //             successmsg = $(`<div class="alert alert-info text-center">Grazie ${name}! Ti contatteremo presto.</div>`);
            //             $('#form-response').append(successmsg);
            //             $('#contactForm').find('input,textarea').val("");
            //             defaultWidget.reset();
            //         }
            //     },
            // });
        }else{ // invalid form
            successmsg = new HTMLElement();
            successmsg.innerHTML = `<div class="alert alert-warning text-center">Ricontrolla i dati</div>`;
            document.getElementById('form-response').append(successmsg);
        }
        // contactForm.classList.add('was-validated')
        submitEvent.preventDefault();
    });
});