"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react"

const footerLinks = {
  services: [
    { name: "Advertising & Branding", href: "#services" },
    { name: "Public Relations", href: "#services" },
    { name: "Digital Campaigns", href: "#services" },
    { name: "Videography", href: "#services" },
    { name: "Motion Graphics", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Why-us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ],
  locations: [
    { name: "Mumbai (HQ)", href: "#" },
    { name: "Kolkata", href: "#" },
    { name: "Hyderabad", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/nini_digital_media?igsh=MW1ybTJjaG1tNzdrNA%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-muted/20 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo & Description */}
            <div className="col-span-2 lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg rotate-6" />
                  <div className="absolute inset-0.5 bg-background rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold"></span>
                    <img src="/nini_logo.png" alt="Logo" className="w-12 h-12 lg:w-12 lg:h-12" />
                  </div>
                </div>
                <div>
                  <span className="text-foreground font-bold">NI NI</span>
                  <span className="text-muted-foreground text-sm block -mt-1">Digital Media</span>
                </div>
              </motion.div>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                Fueling brands with Advertising wings. Full-service creative digital agency 
                transforming brands across India.
              </p>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center hover:border-primary/30 hover:bg-primary/10 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Locations</h4>
              <ul className="space-y-2">
                {footerLinks.locations.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-xs text-muted-foreground">Email us at</p>
                <a
                  href="mailto:info@ninidigital.in"
                  className="text-sm text-primary hover:underline"
                >
                  info@ninidigital.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NI NI Digital Media. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
