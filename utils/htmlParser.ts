import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

export const parser = (html: string) => {
  return parse(DOMPurify.sanitize(html));
};

export const strip = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
