var contactForm;

// UI messages, picked from the page language (<html lang="..">); Italian is the default
var CONTACT_MESSAGES = {
    it: {
        invalidEmail: "Indirizzo email non valido (richiesto)",
        privacyRequired: "Devi accettare i termini per iscriverti alla newsletter",
        serverError: "Errore del server. Riprova più tardi o scrivici a info@resconda.it",
        success: function (name) { return `Grazie ${name}! Riceverai una mail per confermare l'iscrizione (controlla la cartella spam).`; },
        networkError: "Connessione non riuscita. Controlla la rete e riprova, oppure scrivici a info@resconda.it",
        checkData: "Ricontrolla i dati"
    },
    en: {
        invalidEmail: "Invalid email address (required)",
        privacyRequired: "You must accept the terms to subscribe to the newsletter",
        serverError: "Server error. Please try again later or write to us at info@resconda.it",
        success: function (name) { return `Thank you ${name}! You will receive an email to confirm your subscription (check your spam folder).`; },
        networkError: "Connection failed. Check your network and try again, or write to us at info@resconda.it",
        checkData: "Please check the details you entered"
    }
};
var contactMsg = CONTACT_MESSAGES[(document.documentElement.lang || "it").slice(0, 2)] || CONTACT_MESSAGES.it;
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
    var privacy = document.getElementsByName('privacy')[0];
    // var captcha = document.getElementsByName('frc-captcha-solution')[0]; // FriendlyCaptcha v1
    var captcha = document.getElementsByName('frc-captcha-response')[0]; // FriendlyCaptcha v2
    
    email.setCustomValidity("");
    message.setCustomValidity("");
    privacy.setCustomValidity("");
    
    if(!email.checkValidity()){
        email.setCustomValidity(contactMsg.invalidEmail);
        email.reportValidity();
        ret = false;
    }
    // a message or privacy subscription request are required (or both)
    if( !privacy.checked){
        privacy.setCustomValidity(contactMsg.privacyRequired)
        privacy.reportValidity();
        ret = false;
    }
    if(ret){
        return {
            name: name.value,
            phone: phone.value,
            email: email.value,
            message: message.value,
            privacy : privacy.checked,
            "frc-captcha-solution": captcha.value,
        }
    }
    return ret;
}

window.addEventListener("load", () => {
    const myWidget = document.querySelector(".frc-captcha");
    const myButton = document.getElementById("friendlyCaptchaFormSubmit");

    myWidget.addEventListener("frc:widget.complete", function(event) {
        console.log("Widget was completed! Response:", event.detail.response);
        myButton.disabled = false;
        friendlyCaptchaSolved(event.detail.response);
    });

    myWidget.addEventListener("frc:widget.error", function(event) {
        console.error("Widget ran into an error:", event.detail.error);
        myButton.disabled = true;
    });

    myWidget.addEventListener("frc:widget.expire", function(event) {
        console.warn("The widget expired because the user waited too long");
        myButton.disabled = true;
    });



    // defaultWidget = friendlyChallenge.autoWidget;
    contactForm = document.getElementById("contactForm");
    document.getElementById("friendlyCaptchaFormSubmit").addEventListener("click", submitEvent => {
        document.getElementById("form-response").innerHTML = "";
        var validatedData = validateForm();
        if(validatedData !== false){
            // show loader and disable submit button
            document.getElementById("contactFormLoader").classList.remove("d-none");
            // document.getElementById("friendlyCaptchaFormSubmit").classList.add("invisible");
            document.getElementById("friendlyCaptchaFormSubmit").disabled = true;
        
            fetch('/mailer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validatedData)
            })
            .then(async response => {
                document.getElementById("contactFormLoader").classList.add("d-none");
                // the backend always answers with JSON; {errors: [...]} carries a user-facing message
                let data = {};
                try {
                    data = await response.json();
                } catch (e) {
                    data = {};
                }
                let errors = (data && Array.isArray(data.errors)) ? data.errors : [];
                if (!response.ok && errors.length === 0) {
                    errors = [contactMsg.serverError];
                    console.log("Error: " + response.status);
                }
                if (errors.length > 0) {
                    errors.forEach(element => {
                        var errrow = document.createElement('div');
                        errrow.classList.add('alert', 'alert-warning');
                        errrow.textContent = element;
                        document.getElementById("form-response").append(errrow);
                    });
                    return;
                }
                // success implies empty response
                let name = validatedData.name;
                var successmsg = document.createElement('div');
                successmsg.classList.add("alert", "alert-info", "text-center");
                successmsg.innerText = contactMsg.success(name);
                document.getElementById('form-response').append(successmsg);
                document.getElementById('contactForm').querySelectorAll('input,textarea').forEach(el => { el.value = ""; });
                // defaultWidget.reset();
            })
            .catch(error => {
                // network error (offline, timeout...)
                console.error(error);
                document.getElementById("contactFormLoader").classList.add("d-none");
                var errrow = document.createElement('div');
                errrow.classList.add('alert', 'alert-warning');
                errrow.textContent = contactMsg.networkError;
                document.getElementById("form-response").append(errrow);
            });
        }else{ // invalid form
            successmsg = document.createElement('div');
            successmsg.classList.add("alert", "alert-warning", "text-center");
            successmsg.innerText = contactMsg.checkData;
            document.getElementById('form-response').append(successmsg);
        }
        submitEvent.preventDefault();
    });
});
