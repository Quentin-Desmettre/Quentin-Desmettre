import React, { useEffect } from 'react'
import Button from '../../../components/common/Button'
import Send from '../../../assets/send.png'
import { useState } from 'react';
import Box from '../../../components/common/Box';
import Loading from '../../../assets/loading.svg';
import ReCAPTCHA from "react-google-recaptcha";
import { validEmail, defaultEmailSentData, defaultMessage, maxMessageLength, maxFieldLength } from './defaultValues';

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

const Contact = ({ language }) => {
    const contact = language.texts.contact;
    const [emailSentData, setEmailSentData] = useState(defaultEmailSentData);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [canSendEmail, setCanSendEmail] = useState(false);
    const [message, setMessage] = useState(defaultMessage);
    const [token, setToken] = useState("");
    const [captchaTimeout, setCaptchaTimeout] = useState(0);

    const changeField = (field, value) => {
        let newMessage = JSON.parse(JSON.stringify(message));
        newMessage[field] = value;
        setMessage(newMessage);
        setEmailSentData("");
    }

    const validateCaptcha = async (newToken) => {
        setToken(newToken)
        setCanSendEmail(newToken !== null);
        if (newToken === null)
            return;
        setCaptchaTimeout(120);
    }

    useEffect(() => {
        if (captchaTimeout === 0)
            return;
        const interval = setInterval(() => {
            setCaptchaTimeout(captchaTimeout - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [captchaTimeout])

    const getFormErrorMessage = () => {
        if (message.firstname.length === 0)
            return contact.errors.empty_firstname;
        if (message.firstname.length > maxFieldLength)
            return contact.errors.too_long_firstname;

        if (message.lastname.length === 0)
            return contact.errors.empty_lastname;
        if (message.lastname.length > maxFieldLength)
            return contact.errors.too_long_lastname;

        if (message.email.length === 0 || !message.email.match(validEmail))
            return contact.errors.invalid_email;
        if (message.email.length > maxFieldLength)
            return contact.errors.too_long_email;

        if (message.object.length === 0)
            return contact.errors.empty_object;
        if (message.object.length > maxFieldLength)
            return contact.errors.too_long_object;

        if (message.message.length === 0)
            return contact.errors.empty_message;
        if (message.message.length > maxMessageLength)
            return contact.errors.too_long_message;

        return null;
    }

    const sendEmail = async () => {
        try {
            const response = await fetch("http://54.36.183.139:3000/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    object: message.object,
                    firstname: message.firstname,
                    lastname: message.lastname,
                    email: message.email,
                    message: message.message
                })
            })
            const data = await response.json();

            if (data.success)
                return [true, contact.success];
            return [false, data.error];
        } catch (error) {
            return [false, contact.error];
        }
    }
    const trySendEmail = async () => {
        const errorMessage = getFormErrorMessage();
        if (errorMessage) {
            setEmailSentData({
                success: false,
                infos: errorMessage
            });
            return;
        }

        setIsSendingEmail(true);
        const [success, error] = await sendEmail();
        setIsSendingEmail(false);

        setEmailSentData({
            success: success,
            infos: error
        });
        if (success)
            setTimeout(() => {
                setEmailSentData(defaultEmailSentData);
            }, 5000);

        if (!success)
            return
        setMessage(defaultMessage);
    }
    return (
        <div id="contact" className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white m-6">{contact.title}</h1>
            <Box className="flex flex-col text-sm w-7/12 px-5 py-5 items-end">
                <div className='w-full'>
                    <ContactInput label={contact.firstname} placeholder={contact.firstname_placeholder} value={message.firstname} onChange={(event) => {
                        changeField("firstname", event.target.value);
                    }} isValid={true} />

                    <ContactInput label={contact.lastname} placeholder={contact.lastname_placeholder} value={message.lastname} onChange={(event) => {
                        changeField("lastname", event.target.value);
                    }} isValid={true} />

                    <ContactInput label={contact.email} placeholder={contact.email_placeholder} value={message.email} onChange={(event) => {
                        changeField("email", event.target.value);
                    }} isValid={message.email.length === 0 || message.email.match(validEmail)} />

                    <ContactInput label={contact.object} placeholder={contact.object_placeholder} value={message.object} onChange={(event) => {
                        changeField("object", event.target.value);
                    }} isValid={true} />

                    <ContactInput label={contact.message} isTextArea={true} value={message.message} onChange={(event) => {
                        changeField("message", event.target.value);
                    }} isValid={message.message.length <= maxMessageLength} />
                </div>
                <span className={(message.message.length > maxMessageLength ? "text-red-600 " : "") +
                    "mr-12 mt-2 text-header-text text-end"}>
                    {message.message.length}/{maxMessageLength}
                </span>
                <div className='flex w-9/12 mr-10 justify-start'>
                    <ReCAPTCHA
                        sitekey='6LcwexEoAAAAAHDhSzkP3hDUNQqalK5Hpv_gVsrq'
                        onChange={validateCaptcha}
                        theme="dark"
                    />
                </div>
                <div className='mr-10 my-3 flex flex-row justify-end w-9/12'>
                    <div className="flex items-center space-x-2 pl-2">
                        <span className={"font-bold text-justify " + (emailSentData.success ? "text-green-text" : "text-red-600")}>
                            {emailSentData.infos}
                        </span>
                        <Button disabled={!canSendEmail} image={Send} onClick={trySendEmail}>
                            {contact.send}
                            <img src={Loading} alt="partCircle" className={`ml-2 opacity-0 w-5 h-5 animate-spin ${isSendingEmail ? "opacity-100" : "opacity-0"}`} />
                        </Button>
                    </div>
                </div>
            </Box>

        </div>
    )
}

export default Contact
