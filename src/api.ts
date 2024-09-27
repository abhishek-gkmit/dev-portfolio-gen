let developers: Developer[] = [];

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

function updateSkill(
  devId: number,
  oldSkill: string,
  newSkill: string,
): boolean {
  const developer = developers.find(
    ({ id: existingDevId }) => existingDevId === devId,
  );

  if (!developer) {
    return false;
  }

  const { skills } = developer;

  if (
    !skills.some((existingSkill) => existingSkill === newSkill) &&
    skills.some((existingSkill) => existingSkill === oldSkill)
  ) {
    skills[skills.findIndex((existingSkill) => existingSkill === oldSkill)] =
      newSkill;
    return true;
  }

  return false;
}

function updateDeveloper(
  devId: number,
  updates: Partial<Omit<Developer, "id">>,
) {
  const developerIndex = developers.findIndex(
    ({ id: existingDevId }) => existingDevId === devId,
  );

  if (developerIndex === -1) {
    throw Error("Error: developer with devId does not exist");
  }

  developers[developerIndex] = {
    ...developers[developerIndex],
    ...updates,
    id: developers[developerIndex].id,
  };
}

function removeDeveloperByCondition(
  callbackCondition: (developer: Developer) => boolean,
) {
  const deleted: Developer[] = [];

  developers = developers.filter((developer) => {
    if (callbackCondition(developer)) {
      deleted.push(developer);
      return false;
    }

    return true;
  });

  return deleted;
}

function sortDevelopersByEmployementAndAge(
  isEmployed: boolean,
  ageAscending = true,
) {
  developers.sort(function compare(firstDeveloper, secondDeveloper) {
    if (
      firstDeveloper.isEmployed === isEmployed &&
      secondDeveloper.isEmployed === isEmployed
    ) {
      return ageAscending
        ? secondDeveloper.age - firstDeveloper.age
        : firstDeveloper.age - secondDeveloper.age;
    }

    return firstDeveloper.isEmployed === isEmployed ? -1 : 1;
  });

  return developers;
}

function listSkills(devId: number) {
  const developer = developers.find(
    ({ id: existingDevId }) => existingDevId === devId,
  );

  if (!developer) {
    return;
  }

  return [...developer.skills];
}

function findDevelopersBySkill(searchWithskill: string) {
  const devsWithSkill = developers.filter(({ skills }) => {
    return skills.some((skill) => skill === searchWithskill);
  });

  return devsWithSkill;
}

function cloneDeveloper(devId: number) {
  const developer = developers.find(({ id }) => id === devId);

  if (!developer) {
    throw Error(`Error: Developer with id: ${devId} does not exist`);
  }

  return {
    ...developer,
    skills: [...developer.skills],
    projects: developer.projects.map((project) => ({ ...project })),
  };
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
