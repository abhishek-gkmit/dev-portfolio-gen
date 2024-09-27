interface Project {
  projectName: string;
  techStack: string;
  isCompleted: boolean;
}

interface Developer {
  id: number;
  name: string;
  age: number;
  isEmployed: boolean;
  skills: Array<string>;
  projects: Array<Project>;
  experience: number;
}
