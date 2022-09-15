# calculator

Calculator project to practice usage of HTML, CSS and plain Javascript to create a fully functional calculator.

The main goal of the project is nothing but sheer practice of everything I've learned the past few weeks on my journey to learning full stack web development. Special attention will be put towards keeping code as readable as possible. I will also avoid using functions like eval() or the Function constructor because of a) potential security risks (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Never_use_eval!) and b) to go through the process of learning to build functions to evaluate calculations manually.

The inital idea was to avoid using global variables altogether, this proved to be practically impossible or incredibly inconvenient at the very least. Kept usage of global variables to a minimum other than stores of values for operands, operators, results and a way to track whether or not a followup calculation was to be expected.

The biggest challenge turned out to be figuring out a way to update the calculator display correctly with the actual operator that was just used with the correct operand values. A bunch of helper functions were added to avoid cluttering the main operate function and facilitate easier expansion of functionality.
