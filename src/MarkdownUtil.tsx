import SyntaxHighlighter from "react-syntax-highlighter";
import {androidstudio} from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";

export const mdComps = {
    // @ts-ignore
    code({node, inline, className, children, ...props}) {
        // @ts-ignore
        const language = (()=>{
            switch (className) {
                case 'language-cs':
                    return 'csharp';
                case 'language-css':
                    return 'CSS';
                default:
                    return '';
            }
        })();
        return !inline && language !== '' ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={androidstudio}
                className='CodeBlock'
                language={language}
            />
        ) : (
            <code className='InlineCode' {...props}>
                {children}
            </code>
        )
    }
};
