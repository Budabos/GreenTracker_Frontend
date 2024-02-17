import React, { Fragment, useState } from "react";
import { BiMap, BiPhone, BiEnvelope } from "react-icons/bi";

const ContactUs = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        subject: "",
        message: "",
    });

    // Function to handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logging form data
        console.log("Form submitted:", formData);
        // Resetting form fields
        setFormData({
            name: "",
            number: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <Fragment>
            {/* Contact Us section */}
            <section className="bg-green-100 py-12">
                <div className="text-center">
                    <h3>CONTACT US</h3>
                </div>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact information */}
                        <div>
                            <h5 className="text-center">Get in touch with us</h5>
                            <p className="text-center">
                                We would love to hear from you! Whether you have a burning question, a suggestion, or want to share your GreenTracker App moments; getting in touch with us is super easy!
                            </p>
                            {/* Address, phone number, and email */}
                            <address className="text-center">
                                <strong>
                                    <BiMap /> Address:
                                </strong>
                                <br />
                                P.O.BOX 97-00100 Moringa School
                                <br />
                                <strong>
                                    <BiPhone /> Phone No:
                                </strong>
                                <br />
                                +254354577789
                                <br />
                                <strong>
                                    <BiEnvelope /> Email:
                                </strong>
                                <br />
                                software.student@moringaschool.com
                            </address>
                        </div>
                        {/* Contact form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Name, number, email, and subject fields */}
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="form-control bg-white"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Your number"
                                    className="form-control bg-white"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="form-control bg-white"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="form-control bg-white"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Message field */}
                            <textarea
                                placeholder="Message"
                                className="form-control bg-white"
                                rows="3"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {/* Submit button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success text-center"
                                >
                                    Submit form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ContactUs;
