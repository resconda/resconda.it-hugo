import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

const BrevoHandler = {
    addMember: async function(userRequest) {
        const email = userRequest.email;
        if(!email){
            throw new Error("'email' field missing from input data");
        }
        const attributes = {};
        if (userRequest.name) {
            attributes.FIRSTNAME = userRequest.name;
        }
        if (userRequest.surname) {
            attributes.LASTNAME = userRequest.surname;
        }
        if (userRequest.phone) {
            attributes.SMS = userRequest.phone;
        }
        const brevoresponse = await brevo.contacts.createContact({
            listIds: [ parseInt(process.env.BREVO_LIST_ID),],    
            email: email,
            attributes: attributes,
        });
        return brevoresponse;
    }
}

export { BrevoHandler };