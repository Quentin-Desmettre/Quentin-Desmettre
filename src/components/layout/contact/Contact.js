import React from 'react'
import Button from '../../common/Button'
import Send from '../../../assets/send.png'
import { useState } from 'react';
import Box from '../../common/Box';
export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

const ContactInput = ({ label, placeholder = "", isTextArea = false, value, onChange, isValid }) => {
    const className = "text-sm text-white align-top p-2 mt-2 mb-1 ml-2 bg-main-background outline outline-1 rounded w-full" + (isValid ? " outline-main-stroke" : " outline-red-600");

    return (
        <div className="flex items-top">
            <label className="text-white text-sm ml-3 mt-4 align-top text-center h-full w-2/12">{label}</label>
            <div className="w-9/12">
                {
                    isTextArea ?
                        <textarea className={className + " resize-none h-32"} type="text" placeholder={placeholder} value={value} onChange={onChange} />
                        :
                        <input className={className} type="text" placeholder={placeholder} value={value} onChange={onChange} maxLength={100} />
                }
            </div>
        </div>
    )
}

const Contact = ({ language, destRef }) => {
    const contact = language.texts.contact;
    const defaultEmailSentData = {
        success: false,
        infos: ""
    }
    const defaultMessage = {
        email: "",
        object: "",
        message: ""
    }

    const [emailSentData, setEmailSentData] = useState(defaultEmailSentData);
    const [message, setMessage] = useState(defaultMessage);
    const maxMEssageLength = 500;

    const changeField = (field, value) => {
        let newMessage = JSON.parse(JSON.stringify(message));
        newMessage[field] = value;
        setMessage(newMessage);
        setEmailSentData("");
    }

    const getFormErrorMessage = () => {
        if (message.email.length === 0 || !validEmail.test(message.email))
            return contact.errors.invalid_email;
        if (message.object.length === 0)
            return contact.errors.empty_object;
        if (message.message.length === 0)
            return contact.errors.empty_message;
        if (message.message.length > maxMEssageLength)
            return contact.errors.too_long_message;
        return null;
    }
    const sendEmail = () => {
        const errorMessage = getFormErrorMessage();
        if (errorMessage) {
            setEmailSentData({
                success: false,
                infos: errorMessage
            });
            return;
        }

        // TODO: send email
        setEmailSentData({
            success: true,
            infos: contact.success
        });
        setMessage(defaultMessage);
        setTimeout(() => {
            setEmailSentData(defaultEmailSentData)
        }, 2000);
    }
    return (
        <div ref={destRef} className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white m-6">{contact.title}</h1>
            <Box className="flex flex-col text-sm w-5/12 px-5 py-5 items-end">
                <div className='w-full'>
                    <ContactInput label={contact.email} placeholder={contact.email_placeholder} value={message.email} onChange={(event) => {
                        changeField("email", event.target.value);
                    }} isValid={message.email.length === 0 || validEmail.test(message.email)}/>

                    <ContactInput label={contact.object} placeholder={contact.object_placeholder} value={message.object} onChange={(event) => {
                        changeField("object", event.target.value);
                    }} isValid={true}/>

                    <ContactInput label={contact.message} isTextArea={true} value={message.message} onChange={(event) => {
                        changeField("message", event.target.value);
                    }} isValid={message.message.length <= maxMEssageLength}/>
                </div>
                <div className="flex flex-col mr-7 mt-1 items-end">
                    <span className={(message.message.length > maxMEssageLength ? "text-red-600 " : "") +
                        "mr-2 mb-2 text-header-text text-end"}>
                        {message.message.length}/{maxMEssageLength}
                    </span>

                    <div className="flex items-center space-x-2 mt-4">
                        <span className={"font-bold " + (emailSentData.success ? "text-green-text" : "text-red-600")}>
                            {emailSentData.infos}
                        </span>
                        <Button className="" image={Send} onClick={sendEmail}>
                            {contact.send}
                        </Button>
                    </div>
                </div>
            </Box>

        </div>
    )
}

export default Contact
