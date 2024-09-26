const developers: Developer[] = [];

function addDeveloper(developer: Developer): void {
  // validating developer
  if (typeof developer.id !== "number") {
    throw Error("Error: id is not correct");
  } else if (typeof developer.name !== "string" || developer.name === "") {
    throw Error(
      "Error: name property is either empty or it's type is not correct",
    );
  } else if (typeof developer.age !== "number" || developer.age < 14) {
    throw Error("Error: age is not right");
  } else if (typeof developer.isEmployed !== "boolean") {
    throw Error("Error: employement is not boolean type");
  } else if (
    !Array.isArray(developer.skills) ||
    developer.skills.some((skill) => typeof skill !== "string" || skill === "")
  ) {
    throw Error("Error: skills are not right");
  } else if (
    typeof developer.experience !== "number" ||
    developer.experience > developer.age - 14
  ) {
    throw Error("Error: experience is not right");
  } else if (developer.projects.every((project) => validateProject(project))) {
    throw Error("Error: projects are not valid");
  }

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
