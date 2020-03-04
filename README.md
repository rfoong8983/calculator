# The TI-80-poor
A simple calculator built in JavaScript and visualized with React! Tests included!

### Application Details
There are two main components that handle the updating of the UI: Calculator and Button. There is also a Calculator model which manages which buttons have been pressed and which the actual calculations.
  * The Calculator component is responsible for keeping track of what should be displayed and also stores an instance of Calculator Model.
  * The Button component is responsible for delegating commands to the Calculator Model and updating the Calculator components currentDisplay value.
  * Calculator model uses two stacks to build operations (one to keep track of which numbers have been pressed and another to keep track of which operations have been pressed).
  * Tests were written to ensure operations are performed correctly and to handle special cases (e.g., pressing a different operator after an initial operator has been pressed).

### Check it out here!
https://rfoong8983.github.io/calculator/
