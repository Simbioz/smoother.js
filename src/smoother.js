var Smoother = function(maxValueCount) {
  var that = this;

  this.maxValueCount = maxValueCount;

  this.values = [];
  this.value = null;

  function calculateWeight(index, valueCount) {
    return (index + 1) * 1 / valueCount;
  }

  function updateValue() {
    var valueCount = that.values.length;
    if (valueCount == 0) return;

    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < valueCount; i++) {
      var weight = calculateWeight(i, valueCount);
      var value = that.values[i];
      numerator += value * weight;
      denominator += weight;
    }

    that.value = numerator / denominator;
  }

  this.push = function(value) {
    this.values.push(value);

    // Ensure we only keep maxValueCount values
    if (this.values.length > this.maxValueCount)
      this.values.shift();

    updateValue();
  };
};

module.exports = Smoother;
