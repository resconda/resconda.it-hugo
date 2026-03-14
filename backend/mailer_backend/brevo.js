import { BrevoError, BrevoClient } from '@getbrevo/brevo';
import logger from './logger.js';

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

const BrevoDuplicatedContactErrorCode = "duplicate_parameter";
const BrevoHandler = {
    _addAttributesFromRequest: function(userRequest) {
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
        return attributes;
    },
    addMember: async function(userRequest) {
        const email = userRequest.email;
        if(!email){
            throw new Error("'email' field missing from input data");
        }
        const attributes = this._addAttributesFromRequest(userRequest);
        let brevoresponse;
        try { 
            brevoresponse = await brevo.contacts.createContact({
                listIds: [ parseInt(process.env.BREVO_LIST_ID),],    
                email: email,
                attributes: attributes,
            });
        } catch (error) {
            if (error instanceof BrevoError) {
                brevoresponse = {error: error};
            }
        }
        return brevoresponse;
    },
    addMemberDOI: async function(userRequest) {
        // Double-Opt-In
        const email = userRequest.email;
        if(!email){
            throw new Error("'email' field missing from input data");
        }
        const attributes = this._addAttributesFromRequest(userRequest);
        let brevoresponse;
        try {
            brevoresponse = await brevo.contacts.createDoiContact({
                email: email,
                attributes: attributes,
                includeListIds: [
                    parseInt(process.env.BREVO_LIST_ID),
                ],
                redirectionUrl: "http://resconda.it/welcome",
                templateId: 7,
            });    
        } catch (error) {
            brevoresponse = {error: error};
        }
        return brevoresponse;
    },
    listInfo: async function() {
        let brevoResponse;
        try {
            const listid = parseInt(process.env.BREVO_LIST_ID);
            logger.info(`Fetching Brevo list info for list ${listid}`);
            brevoResponse = await brevo.contacts.getList(listid, {});
        } catch (error) {
            brevoResponse = {error: error};
        }
        return brevoResponse;
    }
}

export { BrevoHandler, BrevoDuplicatedContactErrorCode };