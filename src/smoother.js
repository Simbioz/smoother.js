var Smoother = function (maxValueCount) {
  this.maxValueCount = maxValueCount;

  this.values = [];
  this.value = null;

  this.push = function (value) {
    this.values.push(value);

    // Ensure we only keep maxValueCount values
    if (this.values.length > this.maxValueCount)
      this.values.shift();
  };
};

module.exports = Smoother;
