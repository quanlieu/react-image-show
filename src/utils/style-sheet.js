/**
 * Adds a style node with css content to head
 * @param {Object|Object[]} styles Object(s) have two properties:
 *     selector: full css selector
 *     content: follow normal css syntax, separate with semicolon, without curly bracket
 * @param {string} [mediaRule] IE: @media screen and (min-width: 480px)
 * @returns {Node} Node the created DOM node
 */
const addStyleToHead = (styles, mediaRule) => {
  let style = document.createElement('style');
  let innerHTML;
  if (!mediaRule) {
    innerHTML = createCssContent(styles);
  } else {
    innerHTML = `${mediaRule}{${createCssContent(styles)}}`;
  }

  style.type = 'text/css';
  style.innerHTML = innerHTML;
  document.head.appendChild(style);
  return style;
};

/**
 * Remove DOM node from head
 * @param {Node} node Node to remove
 */
const removeStyleFromHead = (node) => {
  document.head.removeChild(node);
};

function createCssContent(styles) {
  if (!Array.isArray(styles)) {
    return `${styles.selector}{${styles.content}}`;
  }

  let result = '';
  for (let i = 0; i < styles.length; i++) {
    result += `${styles[i].selector}{${styles[i].content}}`;
  }
  return result;
}

export { addStyleToHead, removeStyleFromHead };