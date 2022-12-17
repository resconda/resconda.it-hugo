var contactForm;
var defaultWidget;

var friendlyCaptchaSolved = function (solution) {
    $(contactForm).find('.showtransition').removeClass("invisible");
    $('#friendlyCaptchaFormSubmit').removeAttr('disabled');
};

var validateForm = function() {
    var ret = true;
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
    return ret;
}

window.addEventListener("load", function (document, event) {
    defaultWidget = friendlyChallenge.autoWidget;
    contactForm = $("#contactForm")[0];
    $("#form-response").empty();
    $("#friendlyCaptchaFormSubmit").click(submitEvent => {
        if(validateForm()){
            formid = $("#friendlyCaptchaFormSubmit").attr('form');
            data = $(`#${formid}`).serialize();
            $.ajax({
                type: "POST",
                url: "/cgi/form_contact",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(JSON.stringify(data));
                    if (data.errors != undefined && data.errors.length > 0) {
                        data.errors.forEach(element => {
                            errrow = $(`<div class="alert alert-warning">${element}</div>`);
                            $("#form-response").append(errrow);
                        });
                    } else {
                        let name = data.name;
                        successmsg = $(`<div class="alert alert-info text-center">Grazie ${name}! Ti contatteremo presto.</div>`);
                        $('#form-response').append(successmsg);
                        $('#contactForm').find('input,textarea').val("");
                        defaultWidget.reset();
                    }
                },
            });
        }else{ // invalid form

        }
        // contactForm.classList.add('was-validated')
        submitEvent.preventDefault();
    });
});