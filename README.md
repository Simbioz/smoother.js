# smoother.js

Smooth a queue of values with a weighted moving average. Useful for input smoothing and more.

# Installation

## Using NPM

    npm install smoother.js

# Usage

    // Initialize a Smoother with a maximum number of values
    // and a weight distribution function
    // (check out the source for available functions)
    
    var smoother = new Smoother(5, "cubic");
    
    // Push values and observe the resulting smoothed value
    
    smoother.push(1);
    smoother.push(3);
    smoother.push(9);
    
    console.log(smoother.value); // Outputs 7.444
    
    smoother.push(15);
    
    console.log(smoother.value); // Outputs 12.28

# Development

1. Install development dependencies using `npm install`
2. Build the latest version by running `gulp` (default task)
