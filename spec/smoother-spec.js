var Smoother = require("../dist/smoother.min.js");

describe("Smoother", function () {
  describe("values", function () {
    it("cannot contain more than [max values] values", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount);
      smoother.push(1);
      console.log(smoother.value);
      smoother.push(3);
      console.log(smoother.value);
      smoother.push(9);
      console.log(smoother.value);
      smoother.push(15);
      console.log(smoother.value);
      smoother.push(19);
      console.log(smoother.value);
      expect(smoother.values.length).toEqual(maxValueCount);
    });
  });
});
