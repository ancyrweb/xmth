# Motivations

According to HTMX's founder Carson Gross, TDD leads to "that leads to overly exhaustive testing of implementation details, especially early on in projects."
Of course this opinion is wrong and shared by many people who practice TDD incorrectly, 
and [the debate we had](https://www.linkedin.com/feed/update/urn:li:activity:7266833115300401152/) was enough motivation to demonstrate by example why.

With this project, I intend to demonstrate how use TDD to drive the development of a constrained scope of the library, just enough to make my point.
The techniques can then be extended to develop most of the library with unit tests. 

For sample, the unit test suite runs in a few milliseconds. The feedback is immediate especially when running with WallabyJS in the IDE.
Thus, the development cycle is very fast and I get immediate feedback on the design of my code while preventing regressions from happening.

Some can argue that my code isn't proper TDD because the tests are closer to QA-like exhaustive tests than step-by-step unit tests.
To these guys I respectfully ask to get the hell out and stop wasting everyone's time with futile debates.
This is as close as useful TDD can be, exit the pedantic discussions.

For an even better learning experiences, check the commits logs and see how the code evolved step by step.
Also, run the test coverages. Interesting how, incidently, the test coverage is 100%.
This wasn't an effort from my part, it's just a byproduct of the TDD process.

Cheers!