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
              className="relative px-3 py-3 group"
            >
              {/* The elevated active icon */}
              <div 
                className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-500 ${
                  isActive 
                    ? "bg-primary text-background -translate-y-4 scale-110 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.15)]" 
                    : "text-muted-foreground hover:text-foreground z-10"
                }`}
              >
                {item.icon}
                
                {/* Show label for active item */}
                {isActive && (
                  <span className="absolute text-[10px] whitespace-nowrap font-medium top-[calc(100%+2px)] left-1/2 transform -translate-x-1/2 opacity-80">
                    {item.label}
                  </span>
                )}
              </div>
              
              {/* Crater effect in the navbar */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-9 h-3 bg-background/80 rounded-b-xl z-0"></div>
              )}
              
              {/* Hover effect for inactive items */}
              {!isActive && (
                <div className="absolute inset-0 rounded-full bg-muted/0 transition-all duration-300 group-hover:bg-muted/50 z-0"></div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
