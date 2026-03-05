"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Newspaper, Users, Zap, Settings } from "lucide-react"

const reasons = [
  {
    icon: MapPin,
    title: "Multi-City Presence",
    description: "Strategic offices in Mumbai, Kolkata, and Hyderabad for pan-India reach.",
  },
  {
    icon: Newspaper,
    title: "Strong PR Network",
    description: "Deep media relationships and proven track record in public relations.",
  },
  {
    icon: Users,
    title: "In-House Team",
    description: "Dedicated specialists across every discipline, no outsourcing delays.",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Agile processes that deliver quality work on tight timelines.",
  },
  {
    icon: Settings,
    title: "Custom Strategies",
    description: "Tailored solutions designed specifically for your brand and goals.",
  },
]

export function WhyUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-us" className="pt-6 lg:pt-8 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-foreground text-balance">
              The NI NI{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Advantage
              </span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              When you partner with NI NI Digital Media, you gain access to a team 
              that combines creativity with strategy, innovation with execution, 
              and passion with professionalism.
            </p>

            {/* Stats */}
            {/* <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "200+", label: "Happy Clients" },
                { value: "500+", label: "Projects Done" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>

          {/* Right - Reasons */}
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-300">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {reason.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {/* <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
