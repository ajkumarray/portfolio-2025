
import { useState, useEffect } from "react";
import { Home, Code2, FolderKanban, MailPlus } from "lucide-react";

type NavItem = {
  icon: JSX.Element;
  href: string;
  label: string; // Keep for accessibility
};

const navItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, href: "#home", label: "Home" },
  { icon: <Code2 className="h-5 w-5" />, href: "#skills", label: "Skills" },
  { icon: <FolderKanban className="h-5 w-5" />, href: "#projects", label: "Projects" },
  { icon: <MailPlus className="h-5 w-5" />, href: "#contact", label: "Contact" },
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
      <div className="flex items-center space-x-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`relative p-3 rounded-full transition-all duration-500 ${
                isActive 
                  ? "text-primary" 
                  : "hover:bg-muted/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Active icon floating above the crater */}
              <div 
                className={`relative z-20 transition-all duration-500 ${
                  isActive 
                    ? "transform -translate-y-2 scale-110" 
                    : ""
                }`}
              >
                {item.icon}
              </div>
              
              {/* Crater effect */}
              {isActive && (
                <>
                  {/* The crater hole in navbar */}
                  <div className="absolute inset-0 rounded-full bg-background/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] -z-10"></div>
                  
                  {/* The floating circle around active icon */}
                  <div className="absolute inset-0 rounded-full bg-primary/5 transform -translate-y-2 scale-110 z-10 shadow-[0_4px_8px_rgba(0,0,0,0.1)]"></div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm transform -translate-y-2 scale-125 -z-5 opacity-50"></div>
                </>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
