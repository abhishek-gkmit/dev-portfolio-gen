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

const developers: Developer[] = [];

function addDeveloper(developer: Developer): void {
  // validating developer based on type and empty data
  if (typeof developer.name !== 'string' || developer.name === '') {
    // type of name is not string or it's value is empty
    // it's an error
    throw Error("Error: name property is either empty or it's type is not correct");

  } else if (typeof developer.age !== 'number' || developer.age < 14 /* boys who are under 14 are not developers */) {
    throw Error("age is not right");

  } else if (typeof developer.isEmployed !== 'boolean') {
    throw Error("isEmployed is not boolean type");

  } else if (!Array.isArray(developer.skills) || developer.skills.some((skill) => typeof skill !== 'string' || skill === '')
  ) {
    throw Error("skills are not right");

  } else if (typeof developer.experience !== 'number' || developer.experience > developer.age - 14 /* developer's experience can not be greater than maximum experience */) {
    throw Error("experience is not right");

  } else {
    // if everything is fine then we will validate the projects array
    validateProjects(developer.projects);
  }

  // removing duplicate entries from skills array
  developer.skills = developer.skills.reduce<Array<string>>(function removeDuplicate(acc, skill) {
    if (acc.some((s) => s === skill)) {
      // skill is already present in acc that means it's duplicate
      return acc;
    }
    return [...acc, skill];
  }, []);

  // validation successfull adding the developer to developers array
  developers.push(developer);
}

function validateProjects(projects: Project[]): void {
  // this function will validate the projects and throw an error if any project is invalid
}

