This is a [Next.js](https://nextjs.org/) project.

# ottertype

This is a remake of the popular `monkeytype.com` typing test using Next.js.

The project is currently being hosted here: [ottertype](https://www.ottertype.vercel.app/) where you can check it out for all its bugs and glory :]

## TODO:
- Create cursor follow for user input
~~- Fix TypingArea so user can click in to begin typing~~
~~- Implement generating TextDisplay from a file (random words picked and is infinite)~~
- Create a time over page to display final WPM
- Create a results page displaying CPM and WPM to users.

## Known bugs:
- Pressing `enter` as an error at the end of the line causes code to break
- `Esc` Key to reset does not work at times
- TypingArea doesn't seem clear, will bug out at times
- Unable to correctly keep count of CPM and WPM.
    - WPM: CPM / 5 * 60 to calculate assuming the average word is 5 letters long
    - However, unable to correctly maintain the correct CPM for the test
