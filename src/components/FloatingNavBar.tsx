
import { useState, useEffect } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function FloatingNavBar() {
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Get all section elements
      const sections = navItems.map((item) => 
        document.querySelector(item.href) as HTMLElement
      ).filter(Boolean);
      
      // Find the current active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-[50px] left-1/2 transform -translate-x-1/2 z-50 py-3 px-5 rounded-full bg-background/80 backdrop-blur-md shadow-lg border border-border animate-fade-in">
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
              activeSection === item.href 
                ? "bg-primary/10 text-primary shadow-inner transform scale-95" 
                : "hover:bg-muted"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
