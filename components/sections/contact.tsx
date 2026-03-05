
"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@ninidigital.in",
    href: "mailto:info@ninidigital.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9167783361",
    href: "tel:+919167783361",
  },
  {
    icon: MapPin,
    label: "Locations",
    value: "Mumbai • Kolkata • Hyderabad",
    href: null,
  },
]

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/nini_digital_media?igsh=MW1ybTJjaG1tNzdrNA%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Allows letters and spaces only
    if (regex.test(value)) {
      setFormState({ ...formState, name: value });
    }
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9+\-\s()]*$/; // Allows numbers, +, -, spaces, and parentheses
    if (regex.test(value)) {
      setFormState({ ...formState, phone: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL)

    const payload = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone || null,
      company: formState.company || null,
      message: formState.message,
    }

    // Try POSTing to server API
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/inquiries`
      console.log("Fetching from:", fetchUrl)
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Server returned error:", data)
        alert("There was an error sending your message. It has been saved locally.")
      } else {
        // Success from server
        alert("Thank you! Your message has been sent.")
      }
    } catch (err) {
      console.error("Network/server error:", err)
      alert("Network error — your message was saved locally.")
    }

    // Save locally as fallback / for dashboard
    try {
      const existingInquiries = JSON.parse(localStorage.getItem("nini_inquiries") || "[]")
      const localEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        name: formState.name,
        email: formState.email,
        phone: formState.phone || null,
        company: formState.company || null,
        message: formState.message,
        status: "unread",
      }
      localStorage.setItem("nini_inquiries", JSON.stringify([localEntry, ...existingInquiries]))
    } catch (err) {
      console.error("localStorage error:", err)
    }

    // Reset form
    setFormState({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-foreground text-balance">
            Let&apos;s Create{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to elevate your brand? Get in touch and let&apos;s discuss how we can 
            help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-muted/30 backdrop-blur-sm border border-border p-6 lg:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleNameChange}
                      className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formState.phone}
                      onChange={handlePhoneChange}
                      className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Company (Optional)</label>
                    <Input
                      placeholder="Your company"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>
    
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20 border border-border"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Pan-India Presence</p>
                  <p className="text-foreground text-xs mt-1">Mumbai • Kolkata • Hyderabad</p>
                </div>
              </div>
              {/* Grid overlay for map effect */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </motion.div>

            
    
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Follow us on social media</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-muted/30 border border-border flex items-center justify-center hover:border-primary/30 hover:bg-primary/10 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


