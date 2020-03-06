# Adjacent Landing Page

## Installation

### Clone the project

1. Clone the project
2. Go to project folder
3. Create `.env.json` file at root directory, and paste following json script for local port:

```
{
	"PORT": "3070"
}
```

4. install node modules

```
npm install
```

### Local Development

1. Open `MAMP` server and access localhost project url (ex: `localhost:8888/adjacent`)

2. run gulp

```
gulp
```

3. All the `scss` and `js` files will be autocompiled by `gulp`. To view the changes you make, please refresh the `MAMP` local server running in your browser.

## Gulp

### Options

- `gulp` to watch all your files
- `gulp build` when you first clone project, rebuild the project, or when you add some plugins and svg icons.

## Project Source files Structure

Because `gulpfile.js` is watching all the `scss` and `js` files in `src` folder and bundling them into `style.css` and `entry.js` files in `public` folder, which is included in `head` and `body` tags, we only need to focus on `src` folder while developing.

```
src
│
└───js
│   │  entry
│   │  └ entry.js
│   │
│   │ ...other folders
│
└───styles
    │  pages
    │  layouts
    │  foundations
    │  components
    │
    │  style.scss
    │  _pages.scss
    │  _layouts.scss
    │  _foundations.scss
    │  _components.scss

```

_WIP..._
