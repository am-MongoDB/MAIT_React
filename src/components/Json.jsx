import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Json({ object }) {

  function truncateLongStrings(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].length > 60) {
        obj[key] = obj[key].substring(0, 57) + '...';
      }
    }
    return obj;
  }

  return (
    <SyntaxHighlighter language="json" style={docco}>
      {JSON.stringify(truncateLongStrings(object), null, 2)} 
    </SyntaxHighlighter>
  );
}