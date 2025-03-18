'use strict'

const mailchimp = require('@mailchimp/mailchimp_marketing');
const listId = process.env.MAILCHIMP_LIST_ID;

const MailchimpHandler = {
    setup: () => {
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const server = process.env.MAILCHIMP_SERVER; 
        console.log(`listId[${listId}] apiKey[${apiKey.slice(0,2)}...] server[${server}]`);
        mailchimp.setConfig({
            apiKey: apiKey,
            server: server,
        });
    },
    addMember: async function(userRequest) {
        this.setup();

        const email = userRequest.email;
        if(!email){
            throw new Error("'email' field missing from input data");
        }
        var member_info = {
            "email_address": email,
            "status": "subscribed",
            "merge_fields": {}
        };
        const handler_map = [
            {input_key: "name", output_key: "FNAME"},
            {input_key: "surname", output_key: "LNAME"},
            {input_key: "phone", output_key: "PHONE"},
        ]
        for (const element of handler_map) {
            member_info.merge_fields[element.output_key] = userRequest[element.input_key] ?? "";
        }
        console.log(`member_info[${JSON.stringify(member_info)}]`);
        let mailchimpResponse = await mailchimp.lists.addListMember(listId, member_info);
        if(!mailchimpResponse.id){
            throw new Error(`Failed to add member to list ${listId}: ${response}`);
        }
        return mailchimpResponse;
    },
    ping: async function() {
        this.setup();
        const response = await mailchimp.ping.get();
        return response;
    },
    listInfo: async function(listid) {
        this.setup();
        const response = await mailchimp.lists.getList(listid);
        return response;
    }
}

module.exports = MailchimpHandler;
