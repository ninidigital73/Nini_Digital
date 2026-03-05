"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Palette, Megaphone, Share2 } from "lucide-react"

const cities = [
  {
    name: "Mumbai",
    specialty: "Creative Studio",
    description: "Our flagship creative hub where big ideas come to life. Advertising, branding, and full-service production.",
    icon: Palette,
    color: "from-primary to-accent",
    image: "mumbai.png",
  },
  {
    name: "Kolkata",
    specialty: "Public Relations",
    description: "Strategic PR and media relations. Building brand narratives and managing reputations across East India.",
    icon: Megaphone,
    color: "from-secondary to-primary",
    image: "kolkata.png",
  },
  {
    name: "Hyderabad",
    specialty: "Social Media",
    description: "Digital-first campaigns and social media mastery. Engaging audiences across platforms that matter.",
    icon: Share2,
    color: "from-accent to-secondary",
    image: "hyderabad.png",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-foreground text-balance">
            Creativity Without{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Boundaries
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
            NI NI Digital Media is a full-service creative agency with a presence across India. 
            We blend strategy, creativity, and technology to deliver campaigns that resonate, 
            brands that inspire, and content that converts.
          </p>
        </motion.div>

        {/* Company Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm border border-border p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Your Vision, Our Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From concept to execution, we handle every aspect of your digital journey. 
                  Whether you need a viral campaign, stunning videography, or strategic PR, 
                  our multi-disciplinary team delivers excellence at every touchpoint.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Advertising", "PR", "Digital", "Content"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20">
                <img
                  src="image.png"
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    
                    {/* <p className="text-foreground font-medium">NI NI Digital Media</p>
                    <p className="text-muted-foreground text-sm">Where Innovation Flies High</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* City Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-muted/30 backdrop-blur-sm border border-border p-6 hover:border-primary/30 transition-all duration-300">
                {city.image && (
                  <img
                    src={`/${city.image}`}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60" />
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${city.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <city.icon className="w-7 h-7 text-white drop-shadow-lg" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-lg font-bold text-white">{city.name}</span>
                </div>
                <p className="relative z-10 text-accent font-medium mb-3">{city.specialty}</p>
                <p className="relative z-10 text-white/90 text-sm leading-relaxed">
                  {city.description}
                </p>

                {/* Decorative element */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${city.color} opacity-5 rounded-tl-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
