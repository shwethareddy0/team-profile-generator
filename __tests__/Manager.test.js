const Manager = require("../lib/Manager");

const testManager = new Manager("temp manager", 2, "abc@gmail.com", 1);

describe("Manager test", () => {
  it("returns Manager name", () => {
    expect(testManager.getName()).toBe("temp manager");
  });

  it("returns Manager id", () => {
    expect(testManager.getId()).toBe(2);
  });

  it("returns Manager email", () => {
    expect(testManager.getEmail()).toBe("abc@gmail.com");
  });

  it("returns Manager officenumber", () => {
    expect(testManager.getOfficeNumber()).toBe(1);
  });

  it("returns Manager role", () => {
    expect(testManager.getRole()).toBe("Manager");
  });
});
