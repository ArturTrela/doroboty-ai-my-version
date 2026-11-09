# Robot artwork and PCB marketplace

## Intent and acceptance

Adapt the current landing, job board and offer pages to the requested DoRoboty.ai robot references. Use the supplied artwork and lettering, keep the original React routes and live filters, and retain candidate actions and shared scenario data. Inspect the card grip, desktop arm, mobile blink, four mounting holes and reduced-motion behavior. Check readable headings, missing salary, wrapping and navigation at desktop and 320–390 px widths.

## Implementation

Use the robot PNGs and raster slogan from the supplied design package. Adapt PCB lettering in React and use original heading text for assistive technology. The existing job schema has no working-hours field, so the offer panel displays “Nie podano” for that fact. The existing scenario still provides location, work mode, contract and salary where present. Keep the project’s bundled reference kit intact.

## Verification

- Reviewed the live homepage, job board and offer at 1440, 1100, 850, 700, 390 and 320 px. Confirmed no horizontal page overflow, the desktop grippers, the hand overlap at 320/390 px, the 3.6 s desktop arm, the 5.6 s mobile blink, the 2.5 s copper trace reveal and the static reduced-motion states.
- Passed 27 unit tests, lint, type checking, the production build and 32 browser journeys in installed Chrome. Two additional CV tests completed their PDF flows but failed their request assertions on internal Chrome PDF viewer URLs.
- The default verification command stops on Windows checkout line endings. Formatting passed with line-ending detection. The immutable reference and baseline data checks passed on the committed bytes extracted without Windows line-ending conversion.
