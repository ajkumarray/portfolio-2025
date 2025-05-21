
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
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 text-primary shadow-inner transform scale-95" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <div 
                className={`transition-all duration-300 ${
                  isActive 
                    ? "transform scale-110" 
                    : ""
                }`}
              >
                {item.icon}
              </div>
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-primary/5 -z-10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]"></div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
