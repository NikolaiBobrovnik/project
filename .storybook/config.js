import backgrounds from "@storybook/addon-backgrounds"
import { configure, addDecorator } from '@storybook/react'
import { setDefaults as addonInfoSetDefaults } from '@storybook/addon-info'
import { setOptions as addonOptionsSetDefaults } from '@storybook/addon-options'
import {
  setConsoleOptions as addonConsoleSetDefaults,
  withConsole
} from '@storybook/addon-console'
import 'normalize.css'
import '../src/styles/common.scss'

function importAll (r) {
  r.keys().forEach(r)
}

function loadStories() {
  // components stories
  importAll(require.context(
    '../src/components',
    true,
    /.stories.js$/
  ));

  // componentsMobile stories
  importAll(require.context(
    '../src/Mobile/components',
    true,
    /.stories.js$/
  ))
}


/**
 *  Init
 *
 *  - set addon defaults
 *  - add global decorators
 *  - load stories
 *  - etc..
 */
function init() {

  addDecorator((storyFn, context) => withConsole()(storyFn)(context));
  addDecorator(backgrounds([
    { name: "white", value: "#ffffff" },
    { name: "gray", value: "#808080" },
    { name: "light gray", value: "#eaeaea", default: true },
    { name: "dark gray", value: "#2b2b2b" },
    { name: "black", value: "#000000" },
    { name: "red", value: "#ff0000" },
    { name: "green", value: "#00ff00" },
    { name: "blue", value: "#0000ff" },
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" }
  ]));

  addonInfoSetDefaults({
    /**
     * Toggles display of header with component name and description
     * @type {Boolean}
     */
    header: false, // Toggles display of header with component name and description
    /**
     * Displays info inline vs click button to view
     * @type {Boolean}
     */
    inline: false, // Displays info inline vs click button to view
    /**
     * Displays the source of story Component
     * @type {Boolean}
     */
    source: true
  });

  addonOptionsSetDefaults({
    /**
     * name to display in the top left corner
     * @type {String}
     */
    name: 'CMS-Magazine',
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    url: '#',
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    goFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showStoriesPanel: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showAddonPanel: true,
    /**
     * display floating search box to search through stories
     * @type {Boolean}
     */
    showSearchBox: false,
    /**
     * show addon panel as a vertical panel on the right
     * @type {Boolean}
     */
    addonPanelInRight: true,
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: false,
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\//,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off mulitple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: false,
    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedAddonPanel: 'REACT_STORYBOOK/readme/panel', // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: true // true by default
  });

  addonConsoleSetDefaults({
    panelExclude: [] // include [HMR]
  });


  loadStories();
}

configure(init, module);
