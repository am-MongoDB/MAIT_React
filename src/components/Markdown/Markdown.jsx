// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MyH1 from './MyH1';
import MyH2 from './MyH2';
import MyP from './MyP';
import MyImg from './MyImg';

export default function CustomMarkdown({ markdown }) {
  return (
    <div className="markdown-container">
      <Markdown
        remarkPlugins={[remarkGfm]}
        children={markdown}
        components={{
          h1(props) {
            const { children } = props;
            return <MyH1 text={children} />;
          },
          h2(props) {
            const { children } = props;
            return <MyH2 text={children} />;
          },
          p(props) {
            const { children } = props;
            return <MyP text={children} />;
          },
          img(props) {
            return <MyImg props={props} />;
          },
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <div className="code-block-wrapper">
                <SyntaxHighlighter
                  {...rest}
                  PreTag="pre"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={solarizedlight}
                  className="centered-code"
                />
              </div>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
}