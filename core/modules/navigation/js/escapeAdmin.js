/**
 * @file
 * Replaces the home link in toolbar with a back to site link.
 */

((Drupal, drupalSettings, once) => {
  /**
   * Information about the current page path.
   *
   * @type {object}
   */
  const pathInfo = drupalSettings.path;

  /**
   * The last non-administrative page visited in the current browser tab.
   *
   * @type {string}
   */
  const escapeAdminPath = sessionStorage.getItem('escapeAdminPath');

  /**
   * The window object representing the current browser tab.
   *
   * @type {Window}
   */
  const windowLocation = window.location;

  // Saves the last non-administrative page in the browser to be able to link
  // back to it when browsing administrative pages. If there is a destination
  // parameter there is not need to save the current path because the page is
  // loaded within an existing "workflow".
  if (
    !pathInfo.currentPathIsAdmin &&
    !/destination=/.test(windowLocation.search)
  ) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  /**
   * Replaces "Back to site" link url when appropriate.
   *
   * Back to site link points to the last non-administrative page the user
   * visited within the same browser tab.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the replacement functionality to the toolbar-escape-admin element.
   */
  Drupal.behaviors.escapeAdmin = {
    attach() {
      /**
       * Element with the data-toolbar-escape-admin attribute.
       *
       * @type {HTMLElement}
       */
      const toolbarEscape = once('escapeAdmin', '[data-toolbar-escape-admin]');
      if (
        toolbarEscape.length &&
        pathInfo.currentPathIsAdmin &&
        escapeAdminPath !== null
      ) {
        toolbarEscape[0].setAttribute('href', escapeAdminPath);
      }
    },
  };
})(Drupal, drupalSettings, once);