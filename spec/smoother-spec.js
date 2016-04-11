var Smoother = require("../dist/smoother.min.js");

describe("Smoother", function () {
  describe("queue", function () {
    it("cannot contain more than [max value count] values", function () {
      var maxValueCount = 2;
      var smoother = new Smoother(maxValueCount, "cubic");
      smoother.push(1);
      smoother.push(3);
      smoother.push(9);
      expect(smoother.values.length).toEqual(maxValueCount);
    });
  });

  describe("behavior", function () {
    it("should not smooth the value when disabled", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount, "linear");
      smoother.push(1);
      smoother.push(3);
      expect(smoother.value).toEqual(2.3333333333333335);
      smoother.disable();
      expect(smoother.value).toEqual(3);
      smoother.push(9);
      expect(smoother.value).toEqual(9);
    });
  });

  describe("weight distributions", function () {
    it("should properly calculate value with linear weight distribution", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount, "linear");
      smoother.push(1);
      expect(smoother.value).toEqual(1);
      smoother.push(3);
      expect(smoother.value).toEqual(2.3333333333333335);
      smoother.push(9);
      expect(smoother.value).toEqual(5.666666666666667);
      smoother.push(15);
      expect(smoother.value).toEqual(9.4);
      smoother.push(19);
      expect(smoother.value).toEqual(14.2);
    });

    it("should properly calculate value with quadratic weight distribution", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount, "quadratic");
      smoother.push(1);
      expect(smoother.value).toEqual(1);
      smoother.push(3);
      expect(smoother.value).toEqual(2.6);
      smoother.push(9);
      expect(smoother.value).toEqual(6.714285714285714);
      smoother.push(15);
      expect(smoother.value).toEqual(11.133333333333333);
      smoother.push(19);
      expect(smoother.value).toEqual(15.933333333333334);
    });

    it("should properly calculate value with cubic weight distribution", function () {
      var maxValueCount = 4;
      var smoother = new Smoother(maxValueCount, "cubic");
      smoother.push(1);
      expect(smoother.value).toEqual(1);
      smoother.push(3);
      expect(smoother.value).toEqual(2.7777777777777777);
      smoother.push(9);
      expect(smoother.value).toEqual(7.444444444444445);
      smoother.push(15);
      expect(smoother.value).toEqual(12.28);
      smoother.push(19);
      expect(smoother.value).toEqual(16.96);
    });
  });
});
