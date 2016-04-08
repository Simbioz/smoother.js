var Smoother = function(maxValueCount, distribution) {
  var that = this;

  this.maxValueCount = maxValueCount;
  this.distribution = distribution || "linear";

  this.values = [];
  this.value = null;

  function calculateWeight(a, distribution) {
    switch (distribution) {
      case "linear": return a;
      case "quadratic": return Math.pow(a, 2);
      case "cubic": return Math.pow(a, 3);
      default: throw "Unsupported weight distribution '" + distribution + "'";
    }
  }

  function updateValue() {
    var valueCount = that.values.length;
    if (valueCount == 0) return;

    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < valueCount; i++) {
      var weight = calculateWeight((i + 1) / valueCount, that.distribution);
      console.log("WEIGHT: " + weight);
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
