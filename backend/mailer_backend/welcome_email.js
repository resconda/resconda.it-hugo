const WelcomeEmail = {
    plain: (contactName) => {
        return `Ciao ${contactName},
      
grazie per l'interesse nella nostra newsletter! 
Riceverai una volta al mese qualche pillola di conosc(i)enza, che speriamo ti stimolino curiosità e sensibilità sulla sostenibilità energetica.

Se ti piace quello che facciamo e vuoi darci una mano, puoi diventare socio ResConDA. Mandaci la tua richiesta compilando il modulo che trovi qui: https://form.jotform.com/242896877203368

A presto!
Il team ResConDA.


Se non hai richiesto tu l'iscrizione, scrivici a info@resconda.it, provvederemo subito a cancellare il tuo contatto.`;
    },
    html: (contactName) => {
        return `<p>Ciao ${contactName},</p>
<br/>
<p>grazie per l'interesse nella nostra newsletter!</p>
<p>Riceverai una volta al mese qualche pillola di conosc(i)enza, che speriamo ti stimolino curiosità e sensibilità sulla sostenibilità energetica.</p>

<p>Se ti piace quello che facciamo e vuoi darci una mano, puoi diventare socio ResConDA. Mandaci la tua richiesta compilando il modulo che trovi <a href="https://form.jotform.com/242896877203368">qui</a>.</p>

<p>
    A presto!<br/>
    Il team ResConDA.
</p>
<br/>
<p>
    Se non hai richiesto tu l'iscrizione, scrivici a info@resconda.it, provvederemo subito a cancellare il tuo contatto.
</p>
`;
    }
}

module.exports = WelcomeEmail;