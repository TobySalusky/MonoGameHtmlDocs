import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {mdComps} from "../MarkdownUtil";
import {Menu, restringSection} from "../components/Menu";
import {ContactPane} from "../components/ContactPane";
import React, {useEffect, useState} from "react";
import remarkGfm from 'remark-gfm'
import {NavBar} from "../components/NavBar";

export const ContentPage: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('awaiting content...');
    const [section, setSection] = useState<string>('');

    // eslint-disable-next-line no-restricted-globals
    const path = location.pathname;
    const startWith = '/MonoGameHtmlDocs/';
    const newSection = path.substr(path.indexOf(startWith) + startWith.length);
    if (newSection !== section) {
        setSection(newSection);
        window.scrollTo(0, 0);
    }

    useEffect(()=> {
        fetch(`/MonoGameHtmlDocs/markdown/${section}.md`).then(res => res.text()).then(text => setMarkdown(text));
    }, [section])

    return (
        <div className='App'>
            <NavBar/>
            <span className='MarkdownAndMenuWrapper'>
                <div className='MarkdownPane' id='MarkdownPane'>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}
                        // @ts-ignore
                                   components={mdComps}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
                <Menu section={restringSection(section)}/>
            </span>
            <ContactPane/>
        </div>
    );
}
