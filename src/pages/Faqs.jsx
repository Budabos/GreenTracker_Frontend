import React, { useState } from "react";

const FAQComponent = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleAccordionToggle = (index) => {
        setOpenAccordion((prev) => (prev === index ? null : index));
    };

    return (
        <>
            {/* Carbon Footprint Calculation */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(0)}
                >
                    <h2 className="text-lg font-medium">Carbon Footprint Calculation</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 0 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 0 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: How does the carbon footprint calculator work?</strong>
                    </p>
                    <p>
                        A: The carbon footprint calculator works by analyzing various
                        aspects of your lifestyle such as transportation, energy usage, and
                        consumption habits. It takes into account factors such as the type
                        of vehicle you use, your home energy consumption, and your dietary
                        choices.
                    </p>

                    <p>
                        <strong>Q: What factors does the carbon footprint calculation consider?</strong>
                    </p>
                    <p>
                        A: The carbon footprint calculation considers a wide range of factors including transportation methods, energy usage, dietary habits, waste production, and consumption patterns.
                    </p>

                    <p>
                        <strong>Q: Can I input data for different aspects of my lifestyle?</strong>
                    </p>
                    <p>
                        A: Yes, our carbon footprint calculator allows you to input data for various aspects of your lifestyle to provide a comprehensive assessment of your environmental impact.
                    </p>

                    <p>
                        <strong>Q: How accurate is the carbon footprint calculation?</strong>
                    </p>
                    <p>
                        A: Our carbon footprint calculation aims to provide a reasonably accurate estimation based on the data you provide. However, it's important to note that it may not capture every detail of your lifestyle and should be considered as a rough estimate rather than an exact measurement.
                    </p>
                </div>
            </div>

            {/* Sustainable Habits Tracking */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(1)}
                >
                    <h2 className="text-lg font-medium">Sustainable Habits Tracking</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 1 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 1 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: How can I set sustainable living goals?</strong>
                    </p>
                    <p>
                        A: You can set sustainable living goals by accessing the goal-setting feature in the app and defining specific objectives related to reducing waste, conserving resources, or adopting eco-friendly habits.
                    </p>

                    <p>
                        <strong>Q: Can I track my progress in reducing waste and conserving resources?</strong>
                    </p>
                    <p>
                        A: Yes, the app allows you to track your progress towards your sustainable living goals. You can monitor metrics such as waste reduction, energy consumption, water usage, and more.
                    </p>

                    <p>
                        <strong>Q: Are there reminders or notifications to help me stay on track with my goals?</strong>
                    </p>
                    <p>
                        A: Yes, the app provides reminders and notifications to help you stay accountable and motivated towards achieving your sustainable living goals.
                    </p>

                    <p>
                        <strong>Q: What kind of data can I track in terms of sustainable habits?</strong>
                    </p>
                    <p>
                        A: You can track various sustainable habits such as recycling efforts, energy-saving practices, water conservation, transportation choices, and more through the app's tracking features.
                    </p>
                </div>
            </div>

            {/* Eco-Friendly Shopping Guide */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(2)}
                >
                    <h2 className="text-lg font-medium">Eco-Friendly Shopping Guide</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 2 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 2 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: How extensive is the database of eco-friendly products?</strong>
                    </p>
                    <p>
                        A: Our database includes a wide range of eco-friendly products across various categories such as household items, personal care products, clothing, food, and more.
                    </p>

                    <p>
                        <strong>Q: Can I filter products based on specific criteria like eco-certifications or sustainability ratings?</strong>
                    </p>
                    <p>
                        A: Yes, you can filter products based on specific criteria such as eco-certifications, sustainability ratings, organic labels, fair-trade certifications, and more to make informed purchasing decisions.
                    </p>

                    <p>
                        <strong>Q: Are there user reviews or ratings for the products listed?</strong>
                    </p>
                    <p>
                        A: Yes, users can provide reviews and ratings for the eco-friendly products listed in our database to share their experiences and insights with others.
                    </p>

                    <p>
                        <strong>Q: Can I suggest products to be added to the database?</strong>
                    </p>
                    <p>
                        A: Absolutely! We encourage users to suggest eco-friendly products that they believe should be included in our database to enhance the shopping experience for everyone.
                    </p>
                </div>
            </div>

            {/* Community Engagement */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(3)}
                >
                    <h2 className="text-lg font-medium">Community Engagement</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 3 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 3 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: How does GreenTrackerApp connect me with local sustainability initiatives?</strong>
                    </p>
                    <p>
                        A: GreenTrackerApp helps you connect with local sustainability initiatives by providing information about upcoming events, community projects, volunteer opportunities, and organizations working towards environmental conservation in your area.
                    </p>

                    <p>
                        <strong>Q: Can I create or join groups within the app to engage with like-minded individuals?</strong>
                    </p>
                    <p>
                        A: Yes, you can create or join groups within the app to connect with like-minded individuals who share your passion for sustainability. Groups can be focused on specific topics, interests, or geographical locations.
                    </p>

                    <p>
                        <strong>Q: Are there forums or discussion boards for users to share ideas and experiences?</strong>
                    </p>
                    <p>
                        A: Yes, the app features forums and discussion boards where users can engage in conversations, ask questions, share ideas, and exchange experiences related to sustainability, eco-friendly living, and environmental conservation.
                    </p>

                    <p>
                        <strong>Q: Can I find events related to sustainability in my local area through the app?</strong>
                    </p>
                    <p>
                        A: Absolutely! The app provides a comprehensive calendar of events related to sustainability, including workshops, seminars, clean-up drives, eco-friendly markets, and other activities happening in your local area.
                    </p>
                </div>
            </div>

            {/* Educational Resources */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(4)}
                >
                    <h2 className="text-lg font-medium">Educational Resources</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 4 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 4 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: What kind of educational materials does GreenTrackerApp provide?</strong>
                    </p>
                    <p>
                        A: GreenTrackerApp provides a variety of educational materials including articles, videos, infographics, guides, and interactive quizzes covering topics such as climate change, sustainable living, renewable energy, conservation, and more.
                    </p>

                    <p>
                        <strong>Q: Are there articles, videos, or other multimedia content available?</strong>
                    </p>
                    <p>
                        A: Yes, you can access a diverse range of multimedia content including articles, videos, podcasts, webinars, and interactive tools to learn about environmental issues and sustainable practices in an engaging and accessible format.
                    </p>

                    <p>
                        <strong>Q: Can I suggest topics for new educational resources?</strong>
                    </p>
                    <p>
                        A: Absolutely! We welcome suggestions for new educational resources and topics that you would like to see covered in our platform. Your feedback helps us continually improve and expand our educational offerings.
                    </p>

                    <p>
                        <strong>Q: Are the educational resources suitable for all ages and levels of understanding?</strong>
                    </p>
                    <p>
                        A: Yes, our educational resources are designed to cater to a wide audience, including individuals of all ages and levels of understanding. We strive to present information in a clear, concise, and engaging manner to ensure accessibility and inclusivity.
                    </p>
                </div>
            </div>

            {/* Impact Tracking */}
            <div className="border rounded-lg mt-4">
                <div
                    className="border-b py-2 px-4 cursor-pointer flex justify-between items-center"
                    onClick={() => handleAccordionToggle(5)}
                >
                    <h2 className="text-lg font-medium">Impact Tracking</h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-300 ${openAccordion === 5 ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 8l4 4 4-4"></path>
                    </svg>
                </div>
                <div className={`py-2 px-4 ${openAccordion === 5 ? "" : "hidden"}`}>
                    <p>
                        <strong>Q: How can I visualize my environmental impact through the app?</strong>
                    </p>
                    <p>
                        A: You can visualize your environmental impact through the app by accessing personalized dashboards, charts, and graphs that illustrate metrics such as carbon emissions reduced, waste diverted, water saved, and more based on your sustainable actions and lifestyle choices.
                    </p>

                    <p>
                        <strong>Q: Are there metrics or charts to represent my sustainable actions?</strong>
                    </p>
                    <p>
                        A: Yes, the app provides metrics and charts to represent your sustainable actions, allowing you to track your progress over time and gain insights into the positive environmental impact of your efforts.
                    </p>

                    <p>
                        <strong>Q: Can I compare my impact with others in the community?</strong>
                    </p>
                    <p>
                        A: Yes, you can compare your impact with others in the community through leaderboards, challenges, and community-wide goals that encourage friendly competition and collaboration towards achieving collective sustainability objectives.
                    </p>

                    <p>
                        <strong>Q: Are there milestones or achievements for reaching certain sustainability goals?</strong>
                    </p>
                    <p>
                        A: Yes, the app recognizes and celebrates milestones and achievements for reaching certain sustainability goals, providing badges, rewards, and incentives to motivate and incentivize continued engagement and progress towards a more sustainable lifestyle.
                    </p>
                </div>
            </div>
        </>
    );
};

export default FAQComponent;
