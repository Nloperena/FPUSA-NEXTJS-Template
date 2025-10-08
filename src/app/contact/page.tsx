import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Contact Us | FURNITURE PACKAGES USA",
  description: "Get your free consultation today. Let's transform your vacation rental together.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#1B3764] mb-6">Let's Get Started</h1>
            <p className="text-xl text-gray-600">
              Ready to transform your vacation rental? Book your free consultation today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-[#1B3764] mb-6">Book Your Free Consultation</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                    Your Name *
                  </label>
                  <Input id="name" placeholder="John Smith" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number *
                  </label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2 text-gray-700">
                    Property Location
                  </label>
                  <Input id="location" placeholder="Orlando, FL" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                    Tell Us About Your Project
                  </label>
                  <Textarea id="message" placeholder="I have a 3-bedroom vacation rental that needs a complete makeover..." rows={5} />
                </div>
                <Button type="submit" className="w-full bg-[#F16022] hover:bg-[#F16022]/90 text-white text-lg py-6">
                  Request Free Consultation
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#F16022] mb-4">Service Area</h3>
                <div className="space-y-2 text-gray-700 text-lg">
                  <p className="font-semibold">Central Florida</p>
                  <p>Vacation Resort Communities</p>
                  <p>Orlando & Surrounding Areas</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#F16022] mb-4">Get In Touch</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">📞</span>
                    (407) 348-8848
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">📞</span>
                    +1 (407) 301-7789
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">✉️</span>
                    info@furniturepackagesusa.com
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-[#F16022] mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1B3764] to-[#115B87] text-white p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-3">What Happens Next?</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    We'll review your project details
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    Schedule your free consultation call
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    Create a custom proposal for your rental
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
