const skillSwapFunctions = require("../skillswap");

const { filterSkillsByCategory } = skillSwapFunctions;

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20 },
  { title: "Guitar Lessons", category: "Music", price: 15 },
  { title: "Resume Review", category: "Career", price: 0 },
  { title: "Web Development", category: "Programming", price: 25 },
];

describe("filterSkillsByCategory", () => {
  test("filters skills by category", () => {
    expect(filterSkillsByCategory(skills, "Programming")).toEqual([
      skills[0],
      skills[3],
    ]);
  });

  test('returns all skills for the "All" category', () => {
    expect(filterSkillsByCategory(skills, "All")).toEqual(skills);
  });

  test("returns an empty array when there are no category matches", () => {
    expect(filterSkillsByCategory(skills, "Cooking")).toEqual([]);
  });
});
