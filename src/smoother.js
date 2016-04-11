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

  function calculateMedian(sortedValues) {
    var oddLength = sortedValues.length % 2 == 1;
    if (oddLength) return sortedValues[Math.ceil(sortedValues.length / 2.0) - 1];
    var lowerIndex = sortedValues.length / 2 - 1;
    var upperIndex = sortedValues.length / 2;
    return (sortedValues[lowerIndex] + sortedValues[upperIndex]) / 2.0;
  }

  function eliminateOutliers(values) {
    var filteredValues = values.slice();
    filteredValues.sort(function (a, b) { return a - b; });
    var median = calculateMedian(filteredValues);
    console.log("Values: " + filteredValues);
    console.log("Median: " + median);
    return filteredValues;
  }

  function calculateValue() {
    // If there are no values to calculate a new value from, return the current value
    if (that.values.length == 0) return that.value;

    // If smoothing is disabled, return the last value as-is
    if (!that.isEnabled) return that.values[that.values.length - 1];

    // Eliminate outliers if there are enough samples in the data set
    if (that.values.length > 2)
      that.values = eliminateOutliers(that.values);

    var valueCount = that.values.count;

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
