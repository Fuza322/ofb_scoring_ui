/**
 * Sets width and defaults to 'fill'
 * @param width
 * @return {string}
 */
export const fillWidth = width => (width && width !== 'fill')
  ? `width: ${width};`
  : 'width: 100%; width: -moz-available; width: -webkit-fill-available; width: fill-available; width: stretch;';

/**
 * Sets height and defaults to 'fill'
 * @param height
 * @return {string}
 */
export const fillHeight = height => height
  ? `height: ${height};`
  : 'height: 100%; box-sizing: border-box;';
