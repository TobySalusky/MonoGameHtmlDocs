import React, {useState} from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown'
// @ts-ignore
import mdFile from './markdown/docs.md';
// @ts-ignore
import rehypeRaw from 'rehype-raw'
import {mdComps} from "./MarkdownUtil";
import {ContactPane} from "./components/ContactPane";
import {NavBar} from "./components/NavBar";
import {Menu} from "./components/Menu";

function App() {
    const [markdown, setMarkdown] = useState<string>('awaiting content...');
    fetch(mdFile).then(res => res.text()).then(text => setMarkdown(text));
    return (
        <div className='App'>
            <div className='MarkdownPane'>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}
                    // @ts-ignore
                    components={mdComps}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
            <ContactPane/>
        </div>
    );
}

export default App;
