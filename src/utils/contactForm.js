import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
const ContactForm = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        formik.setFieldValue('message', formik.values.message + emojiObject.emoji);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (values) => {
            // Handle form submission here
            console.log('Form data submitted:', values);
        },
    });
    const [isMsg, setIsMsg] = useState(false);
    return (
        <div className='pl-52'>
            <h2 className='text-black text-4xl font-bold mt-28  mb-10 rounded-lg'>Contact Us</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className={`border rounded-md py-2 px-5 w-96 ${formik.touched.name && formik.errors.name
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                        placeholder='Name'
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="mb-4 ">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`w-96 border rounded-md p-2 ${formik.touched.email && formik.errors.email
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                        placeholder='Email'
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="mb-4 flex flex-wrap">
                    <textarea
                        id="message"
                        name="message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        className={`w-96 border rounded-md p-2 ${formik.touched.message && formik.errors.message
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                        placeholder='Type your message here.....'

                    />
                    <div className="">
                        <button className='bg-gray-200 rounded-md' onClick={() => setShowEmojiPicker(!showEmojiPicker)}><AddReactionIcon style={{ fontSize: '4rem' }} /></button>
                        {showEmojiPicker ? (
                            <div className="emoji-picker">
                                <EmojiPicker onEmojiClick={handleEmojiClick} width={400} />
                            </div>
                        ) : null}
                    </div>
                </div>
                {formik.touched.message && formik.errors.message ? (
                    <div className="text-red-500">{formik.errors.message}</div>
                ) : null}
                {(isMsg === true) ? (<h1 className='text-sm italic font-semibold mb-5'>Thanks for contacting us. We will reach you ASAP.</h1>) : (<h1></h1>)}
                <div className='ml-36'>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => {
                            setIsMsg(true);
                        }}
                    >
                        Submit
                    </button>

                </div>
            </form>
        </div>
    );
};

export default ContactForm;
