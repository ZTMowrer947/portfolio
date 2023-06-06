export default function ctImageLoader({ src, width, quality }) {
  const height = Math.trunc((width / 16) * 9);

  const query = {
    w: width,
    h: height,
    q: quality,
  };

  const queryString = Object.entries(query)
    .filter(([, value]) => !!value)
    .map((entry) => entry.join('='))
    .join('&');

  if (src.includes('?')) return [src, queryString].join('&');
  else return [src, queryString].join('?');
}
