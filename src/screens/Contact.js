import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUsPage = () => {
  const pageStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#white",
  };

  const faqStyle = {
    backgroundColor: "#eee",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    color: "red",
  };

  const formStyle = {
    backgroundColor: "#black",
    padding: "20px",
    borderRadius: "10px",
  };

  // FAQ Data
  const [expandedIndex, setExpandedIndex] = useState(null);

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
        "You can contact our customer support team via email at support@24/7 Mart.com or by phone at +1 (555) 123-4567.",
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
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, physical and digital gift cards can be purchased on our website.",
    },
    {
      question: "Can I get a refund for my order?",
      answer:
        "Refunds are handled on a case-by-case basis. Please contact support.",
    },
  ];

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("We will reach out to you soon!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Contact Us</h1>

      <div style={faqStyle}>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {faqs.map((faq, index) => (
            <li
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#90F5CA" : "#e0e0e0",
                color: "red ",
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
                  color: "black",
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
      </div>

      <div style={formStyle}>
        <h2>Contact Information</h2>
        <p>
          If your question is not addressed in the FAQs or if you need further
          assistance, feel free to reach out to us using the following contact
          form:
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </label>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
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

      {/* Toast container for displaying messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ContactUsPage;
