var Smoother = function (maxValueCount) {
  this.maxValueCount = maxValueCount;

  this.values = [];
  this.value = null;

  function push(value) {
    this.values.push(value);

    // Ensure we only keep maxValueCount values
    if (this.values.count > this.maxValueCount)
      this.values.shift();

    console.log(this.values);
  }
};

module.exports = Smoother;
