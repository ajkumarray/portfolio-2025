
import { useState, useEffect } from "react";
import { Home, Info, Briefcase, Settings, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  icon: JSX.Element;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, href: "#home", label: "Home" },
  { icon: <Info className="h-5 w-5" />, href: "#skills", label: "Skills" },
  { icon: <Briefcase className="h-5 w-5" />, href: "#projects", label: "Projects" },
  { icon: <Settings className="h-5 w-5" />, href: "#services", label: "Services" },
  { icon: <Mail className="h-5 w-5" />, href: "#contact", label: "Contact" },
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
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 py-2 px-4 rounded-full bg-background/80 dark:bg-muted/95 backdrop-blur-md shadow-lg border border-border animate-fade-in">
      <div className="flex items-center space-x-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="group relative flex flex-col items-center"
            >
              <div 
                className={cn(
                  "relative p-3 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground dark:text-black -translate-y-3 shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "transition-all duration-300",
                  isActive ? "transform scale-110" : ""
                )}>
                  {item.icon}
                </div>
                
                {/* Crater effect for active item */}
                {isActive && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-background/80 dark:bg-muted/95 rounded-t-full z-[-1]"></div>
                )}
              </div>
              
              {/* Label under each icon */}
              <span className={cn(
                "text-xs mt-1 transition-all duration-300",
                isActive 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground group-hover:text-foreground"
              )}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
