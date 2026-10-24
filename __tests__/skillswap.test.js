const skillSwapFunctions = require("../skillswap");

const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser,
} = skillSwapFunctions;

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

describe("calculateTotalCosts", () => {
  test.each([
    [20, 2, 40],
    [15, 4, 60],
  ])("calculates the cost for rate %s and %s hours", (hourlyRate, hours, total) => {
    expect(calculateTotalCosts(hourlyRate, hours)).toBe(total);
  });

  test.each([
    [0, 3, 0],
    [20, 0, 0],
  ])("returns zero for rate %s and %s hours", (hourlyRate, hours, total) => {
    expect(calculateTotalCosts(hourlyRate, hours)).toBe(total);
  });

  test("calculates the cost for decimal hours", () => {
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });
});

describe("matchSkillsToUser", () => {
  const matchingSkills = [
    { title: "Python Tutoring", category: "Programming", price: 20 },
    { title: "JavaScript Help", category: "Programming", price: 25 },
    { title: "Guitar Lessons", category: "Music", price: 15 },
    { title: "Resume Review", category: "Career", price: 0 },
  ];

  test("matches by category and maximum price", () => {
    expect(
      matchSkillsToUser(
        { category: "Programming", maxPrice: 30 },
        matchingSkills,
      ),
    ).toEqual(matchingSkills.slice(0, 2));
  });

  test("filters out skills above the maximum price", () => {
    expect(
      matchSkillsToUser(
        { category: "Programming", maxPrice: 20 },
        matchingSkills,
      ),
    ).toEqual([matchingSkills[0]]);
  });

  test("returns an empty array when no skills match", () => {
    expect(
      matchSkillsToUser({ category: "Cooking", maxPrice: 100 }, matchingSkills),
    ).toEqual([]);
  });

  test("includes free skills when the maximum price is zero", () => {
    expect(
      matchSkillsToUser({ category: "Career", maxPrice: 0 }, matchingSkills),
    ).toEqual([matchingSkills[3]]);
  });
});
