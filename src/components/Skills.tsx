
import { Progress } from "@/components/ui/progress";

type Skill = {
  name: string;
  level: number;
  category: string;
};

const skills: Skill[] = [
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "React", level: 92, category: "Frontend" },
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Python", level: 75, category: "Backend" },
  { name: "SQL", level: 80, category: "Backend" },
  { name: "AWS", level: 70, category: "DevOps" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Git", level: 85, category: "Tools" },
];

const categories = [...new Set(skills.map(skill => skill.category))];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            My expertise spans multiple technologies across frontend, backend, and DevOps domains,
            allowing me to build complete solutions from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((category) => (
            <div 
              key={category}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">
                {category}
              </h3>
              <div className="space-y-5">
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
