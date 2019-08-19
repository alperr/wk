# Migration Notes 0.2.22 to 0.3.0
August-18-2019

i have decided to make a breaking change to wk and dropped typescript support 

even though i love typescript and typed languages for programming, 
i had some negative experiences with 'typescript' so far 

- typescript transpiler is slow and getting slower with each release.
i have tried lots of things but there is no way for me to solve this problem
(i have even experimented alternative compiler 'sucrase')
- typescript language is growing very rapidly and wk uses outdated typescript
features like triple-slash-reference-directives and namespace keyword.wk already
encourages to use a small subset of typescript language, the statement 
'wk is a toolkit for developing web apps with typescript' is getting less true
with each typescript release (which is too frequent for my taste)
- even it is very easy to understand how it works, typescript is 
complexifying wk for new learners, new wk users are always asking typescript
related questions instead of wk architecture to understand a project written
with wk
- as of aug 2019, es6 'class' and 'extends' keyword is very well supported by
major browsers, which makes one of the transpilation reasons fade away
- one less dependency in the project always feels good


## what is gained by dropping typescript

- faster build times (5-10 seconds to 10-50 milliseconds)
- less things to learn for new wk users
- smaller codebase for maintaining wk development itself

## what is lost by dropping typescript

- very helpful type checks
- smart autocomplete, code navigation

still, i am not convinced that dropping typescript is a good idea,
since wk is still in an experimental stage, i may re-introduce typescript 
in the future

