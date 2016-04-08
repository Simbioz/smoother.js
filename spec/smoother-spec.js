var Smoother = require("../dist/smoother.min.js");

describe("Smoother", function () {
  describe("values", function () {
    it("cannot contain more than [max values] values", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount);
      smoother.push(1);
      smoother.push(3);
      smoother.push(9);
      smoother.push(15);
      smoother.push(19);
      expect(smoother.values.length).toEqual(maxValueCount);
    });
  });
});
