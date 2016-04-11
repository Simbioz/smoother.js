var Smoother = function(maxValueCount, distribution) {
  var that = this;

  this.maxValueCount = maxValueCount;
  this.distribution = distribution || "linear";

  this.isEnabled = true;
  this.values = [];
  this.value = null;

  // Private Functions

  function calculateWeight(a, distribution) {
    switch (distribution) {
      case "linear": return a;
      case "quadratic": return Math.pow(a, 2);
      case "cubic": return Math.pow(a, 3);
      default: throw "Unsupported weight distribution '" + distribution + "'";
    }
  }

  function calculateValue() {
    var valueCount = that.values.length;

    // If there are no values to calculate a new value from, return the current value
    if (valueCount == 0) return that.value;

    // If smoothing is disabled, return the last value as-is
    if (!that.isEnabled) return that.values[that.values.length - 1];

    // Else calculate the moving average
    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < valueCount; i++) {
      var weight = calculateWeight((i + 1) / valueCount, that.distribution);
      var value = that.values[i];
      numerator += value * weight;
      denominator += weight;
    }
    return numerator / denominator;
  }

  // Public Functions

  this.push = function (value) {
    this.values.push(value);

    // Ensure we only keep maxValueCount values
    if (this.values.length > this.maxValueCount)
      this.values.shift();

    this.value = calculateValue();
  };

  this.enable = function () {
    this.isEnabled = true;
    this.value = calculateValue();
  };

  this.disable = function () {
    this.isEnabled = false;
    this.value = calculateValue();
  };
};

module.exports = Smoother;
