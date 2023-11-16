// ContactUsPage.js
import React, { useState } from "react";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission (e.g., send an email)
    console.log("Form submitted:", formData);
  };

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "To place an order, log in to your account, browse our menu, and add items to your cart. Follow the checkout process to complete your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, mobile wallets, and other secure payment methods.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you can track its status in real-time through the 'My Orders' section on our app.",
  },
  {
    question: "Is there a minimum order amount?",
    answer: "Yes, the minimum order amount for delivery is $10.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Unfortunately, we cannot modify orders once they are placed. Please review your order carefully before confirming.",
  },
  {
    question: "Do you offer discounts for bulk orders?",
    answer:
      "Yes, we provide discounts for bulk orders. Contact our customer support for more information.",
  },
  {
    question: "What is your delivery radius?",
    answer:
      "Our delivery radius is currently 10 miles from our main location. You can check if we deliver to your area during the checkout process.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password on the login page by clicking on the 'Forgot Password' link and following the instructions sent to your email.",
  },
  {
    question: "Are there vegetarian options available?",
    answer:
      "Yes, we offer a variety of delicious vegetarian options. Check our menu for details.",
  },
  {
    question: "How can I provide feedback on my order?",
    answer:
      "We appreciate your feedback! You can provide feedback through the app or by contacting our customer support directly.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Yes, we have a mobile app available for both iOS and Android devices. You can download it from the App Store or Google Play.",
  },
  {
    question: "What should I do if my order is incorrect?",
    answer:
      "If your order is incorrect, please contact our customer support immediately, and we will rectify the issue.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via email at support@dashdine.com or by phone at +1 (555) 123-4567.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we take the security of your payment information seriously. Our payment processing is encrypted and follows industry best practices.",
  },
  {
    question: "What happens if my food is delivered late?",
    answer:
      "We apologize for any delays. If your food is delivered late, please contact our customer support, and we will address the issue.",
  },
];



  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Contact Us</h1>
      <p>
        Welcome to DashDine's Contact Us page. We are here to assist you with
        any questions or concerns you many have about our food delivery service.
        Please find below some frequently asked questions (FAQs) and our contact
        information.
      </p>

      <h2>Frequently Asked Questions (FAQs)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {faqs.map((faq, index) => (
          <li
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#90F5CA" : "#e0e0e0",
              color: "black ",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "5px",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </button>
            {expandedIndex === index && (
              <p style={{ margin: "10px 0 0", fontSize: "0.9em" }}>
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: "20px" }}>Contact Information</h2>
      <p>
        If your question is not addressed in the FAQs or if you need further
        assistance, feel free to reach out to us using the following contact
        form:
      </p>

      <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: "100%" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: "100%" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            style={{ width: "100%" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            style={{ width: "100%", minHeight: "100px" }}
          ></textarea>
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUsPage;
