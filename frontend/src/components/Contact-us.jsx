

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Linkedin, CheckCircle } from "lucide-react"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        const response = await fetch("http://localhost:3000/contactUs/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          setSubmitStatus({
            submitted: true,
            success: true,
            message:
              "Thank you! Your message has been sent successfully. We will get back to you soon.",
          });
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          setSubmitStatus({
            submitted: true,
            success: false,
            message: result.message || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        setSubmitStatus({
          submitted: true,
          success: false,
          message: "Network error. Please try again later.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  return (
    <div className="bg-white my-20">
      {/* Plant-themed decorative elements */}
      <div className="absolute left-0 top-0 w-32 h-32 md:w-64 md:h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute right-0 bottom-0 w-40 h-40 md:w-80 md:h-80 bg-green-50 rounded-full translate-x-1/4 translate-y-1/4 opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-[rgb(121,163,7)] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our plants or need advice? We're here to help! Fill out the form below or use our
            contact information to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden">
            {/* Decorative plant illustration */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 text-green-50">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path
                  d="M42.7,-62.9C56.7,-53.5,70.3,-42.8,76.4,-28.5C82.4,-14.2,80.9,3.7,74.9,19.1C68.9,34.5,58.4,47.4,45.1,57.3C31.8,67.2,15.9,74.1,0.1,73.9C-15.6,73.8,-31.3,66.6,-45.6,56.6C-59.9,46.6,-72.8,33.7,-77.8,17.8C-82.8,1.9,-79.9,-17,-71.1,-31.9C-62.2,-46.8,-47.3,-57.7,-32.8,-66.7C-18.3,-75.7,-4.1,-82.8,9.2,-79.8C22.5,-76.8,28.7,-72.3,42.7,-62.9Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            {submitStatus.submitted && submitStatus.success ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="text-green-600 mb-4">
                  <CheckCircle size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-center">{submitStatus.message}</p>
                <button
                  onClick={() => setSubmitStatus({ submitted: false, success: false, message: "" })}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Us A Message</h3>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Plant Care Question"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${errors.message ? "border-red-500" : "border-gray-300"}`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md text-white font-medium flex items-center justify-center transition-colors ${isSubmitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            {/* Map */}
            <div className="bg-gray-200 rounded-xl overflow-hidden h-64 mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215685839937!2d-73.98823492346204!3d40.758895071483945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5m2!1s!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-medium text-gray-800">Our Location</h4>
                    <p className="text-gray-600 mt-1">EverGreen Nursary , Sihala, ISLD Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-medium text-gray-800">Phone Number</h4>
                    <p className="text-gray-600 mt-1">+92 (310) 651-9763</p>
                    <p className="text-gray-600">+92 (319) 192-4045</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-medium text-gray-800">Email Address</h4>
                    <p className="text-gray-600 mt-1">info@plantiffy.com</p>
                    <p className="text-gray-600">support@plantiffy.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-medium text-gray-800">Working Hours</h4>
                    <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-md font-medium text-gray-800 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors">
                    <Facebook className="h-5 w-5 text-green-600" />
                  </a>
                  <a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors">
                    <Instagram className="h-5 w-5 text-green-600" />
                  </a>
                  <a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors">
                    <Twitter className="h-5 w-5 text-green-600" />
                  </a>
                  <a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors">
                    <Linkedin className="h-5 w-5 text-green-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Do you offer plant care advice?</h4>
              <p className="text-gray-600">
                Yes! Our team of plant experts is available to provide care tips and advice for all your plants. Feel
                free to contact us with any questions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-lg font-medium text-gray-800 mb-2">What is your return policy?</h4>
              <p className="text-gray-600">
                We offer a 14-day satisfaction guarantee. If your plant arrives damaged or you're not satisfied, please
                contact us for a replacement or refund.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Do you ship internationally?</h4>
              <p className="text-gray-600">
                Currently, we ship within the continental Pakistan. We're working on expanding our shipping options
                to international locations soon.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-lg font-medium text-gray-800 mb-2">How often should I water my plants?</h4>
              <p className="text-gray-600">
                Watering needs vary by plant type. We include care instructions with each plant, and our team is always
                available to provide specific guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
