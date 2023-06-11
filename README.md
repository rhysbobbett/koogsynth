# KoogSynth
A Javacript Synthesiser

This is milestone project 2 of the [Code Institute](https://codeinstitute.net/) Full Stack Software Development course.
The goal of this project is to *build an interactive front-end site that should respond to users' actions, such as a data dashboard, a memory game, or use of an external API such as Google Maps*".
My project will be utilisng the Web Audio API. It is powerful for browser audio processing, some processors maybe capable of running thousands of simultaneous sounds without stuttering.

### User Stories

"**_As a user, I would like to_** _______________"

- start the synthesiser easily on any device.
- play single notes and chords using a polyphonic keyboard
- play the synthesiser using my own midi device, the computer keyboard, clicking with a mouse or tapping a touchscreen 
- receive indication of what notes are played on screen
- be able to select different waveforms
- change the tone of the notes being played using dials
- change volume of the on-screen device
- change the rate of the low-frequency oscillator.
- add a level of noise to the sound with a dial.
- change the voltage control frequency with a dial.

### Design

The page is to be responsive and appropriate for all devices, both mobile and desktop. The on-screen device will be easy to use with a tooltip layer that can be turned on or off. The layout takes inspiration from various popular synthesisers and audio devices.

#### Colour Scheme
The colour scheme below is chosen for a high-contrast, retro look.
![Coolors Colour Theme](documentation/theme.png)

#### Frameworks

There was no requirement for any use of frameworks, such as the following:
- Bootstrap
- CSS Grid
- jQuery with the exception of Jasmine-jQuery for testing

In the future, I may use the Tone.js framework to add additional functionality to the synthesiser.

## Technologies Used

### Front-End Technologies

- ![HTML5](https://img.shields.io/static/v1?label=HTML&message=5&color=E34F26&logo=html5&logoColor=ffffff)
    - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used for structuring the markup text
- ![CSS3](https://img.shields.io/static/v1?label=CSS&message=3&color=1572B6&logo=css3&logoColor=ffffff)
    - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) - Used for cascading styles.
- ![JavaScript](https://img.shields.io/static/v1?label=JavaScript&message=ES6&color=F7DF1E&logo=javascript&logoColor=ffffff)
    - [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Used for the synthesiser engine.
- ![Jasmine](https://img.shields.io/static/v1?label=Jasmine&message=3.5.0&color=8A4182)
    - [Jasmine](https://jasmine.github.io/) - Used for Test-Driven Development (TDD).
- ![jasmine-jquery](https://img.shields.io/static/v1?label=jasmine-jquery&message=2.1.1&color=535B9F)
    - [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) - Used to testing


## Testing
Automated and manual testing is carried out to ensure the site passes all validation for each technology used.

### Validators

**HTML**
- [W3C HTML Validator](https://validator.w3.org)


**CSS**
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

**JavaScript**
- [JShint](https://jshint.com/)
    - File: [script.js](assets/js/script.js)
    - File: [koog-tests.js](testing/automated/koog-tests.js)
    
- [Esprima](https://esprima.org/demo/validate.html)

### Compatibility

- **Chrome**
- **Firefox Developer Edition** 
- **Edge**
- **Internet Explorer** 

**Chrome's Lighthouse Audit Report**

### Known Issues

### Automated Testing

## Deployment

### Local Deployment

In order to run this project locally on your own system, you will need the following installed (as a bare minimum):

- [GIT](https://www.atlassian.com/git/tutorials/install-git) for cloning and version control.
- [Microsoft Visual Studio Code](https://code.visualstudio.com) (or any suitable IDE) to develop your project.

Next, to proceed with local deployment, you can...

EITHER:
- **Download** this GitHub repository
    - by clicking the green "*Clone or download*" button above,
    - select *Download Zip*,
    - this will download the project as a zip-file (*remember to unzip it first*).

OR:
- **Clone** this GitHub repository
    - by entering the following command into the Git CLI terminal:
        - `git clone https://github.com/TravelTimN/simon-game.git`
    - [Troubleshooting for **git cloning**](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

Congratulations! Your project should be completely setup and ready for local development! :tada:

### Remote Deployment

This site was deployed using [GitHub Pages](https://pages.github.com/) using the **main branch**.

Deployed Site:
- [https://rhysbobbett.github.io/koogsynth](https://rhysbobbett.github.io/koogsynth)

Once you have the project setup locally, you can proceed to deploy it remotely with the following steps:

1. Navigate to your GitHub repository:
    - `https://github.com/USERNAME/REPO`
2. Click on the **Settings** tab at the top:
    - `https://github.com/USERNAME/REPO/settings`
3. Scroll down on that page to the **GitHub Pages** section.
4. The first drop-down field should be **Source** with *None* preselected.
5. Select **main branch** from the list.
6. The page should refresh.
7. Scroll back down to the **GitHub Pages** section.
8. You should now have a deployed link:
    - `https://USERNAME.github.io/REPO`

**IMPORTANT NOTE**:
- Please allow a few minutes to pass before opening your newly deployed link! Clicking this link too quickly may result in a failure to build the site, causing an Error 404 page instead.

Congratulations! Your project should be deployed successfully on GitHub Pages! :tada:

## Credits
The synthesiser knobs used are credited to [JSAudioKnobs](https://github.com/ColinBD/JSAudioKnobs).

### Content

### Media

- [Coolors](https://www.coolors.co) - Colour Scheme palette.
- [Shields.io](https://shields.io) - Markdown badges.
- []

### Code

- [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API) - My main source for reference on how to utilise the Web Audio API.




