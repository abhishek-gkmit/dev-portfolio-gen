const developers: Developer[] = [];

function addDeveloper(developer: Developer): void {
  validateDeveloper(developer);

  // removing duplicate entries from skills array
  developer.skills = developer.skills.reduce<Array<string>>(
    function removeDuplicate(uniqueSkillsArray, skill) {
      if (uniqueSkillsArray.some((uniqueSkill) => uniqueSkill === skill)) {
        return uniqueSkillsArray;
      }
      return [...uniqueSkillsArray, skill];
    },
    [],
  );

  developers.push(developer);
}

function validateDeveloper(developer: Developer) {
  // validating developer
  if (typeof developer.id !== "number") {
    throw Error("Error: ID should be a number");
  } else if (typeof developer.name !== "string" || developer.name === "") {
    throw Error("Error: Name is either empty or is invalid");
  } else if (typeof developer.age !== "number" || developer.age < 14) {
    throw Error("Error: Age should be a number above 14");
  } else if (typeof developer.isEmployed !== "boolean") {
    throw Error("Error: Please select you are employed or not");
  } else if (
    !Array.isArray(developer.skills) ||
    developer.skills.some((skill) => typeof skill !== "string" || skill === "")
  ) {
    throw Error("Error: Skills are invalid");
  } else if (
    typeof developer.experience !== "number" ||
    developer.experience > developer.age - 14
  ) {
    throw Error(
      "Error: Experience should be a number and less than or equal to your age - 14",
    );
  } else if (developer.projects.every((project) => validateProject(project))) {
    throw Error("Error: Projects are not valid");
  }
}

function addSkill(devId: number, newSkill: string): boolean {
  const developer = developers.find((dev) => dev.id === devId);

  // checking if developer with devId and newSkill does not exists
  if (
    developer &&
    !developer.skills.some((existingSkill) => existingSkill === newSkill)
  ) {
    developer.skills.push(newSkill);
    return true;
  }

  return false;
}

function validateProject(project: Project): boolean {
  if (typeof project.projectName !== "string" || project.projectName === "") {
    return false;
  } else if (typeof project.isCompleted !== "boolean") {
    return false;
  } else if (
    typeof project.techStack !== "string" ||
    project.techStack.length < 4
  ) {
    return false;
  }

  return true;
}
