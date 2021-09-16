import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {mdComps} from "../MarkdownUtil";
import {Menu, restringSection} from "../components/Menu";
import {ContactPane} from "../components/ContactPane";
import React, {useEffect, useState} from "react";
import remarkGfm from 'remark-gfm'
import {NavBar} from "../components/NavBar";

export const ContentPage: React.FC<{page: string}> = ({page}) => {

    const [markdown, setMarkdown] = useState<string>('awaiting content...');

    fetch(`/MonoGameHtmlDocs/markdown/${page}.md`).then(res => res.text()).then(text => setMarkdown(text));
    window.scrollTo(0, 0);

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
                <Menu page={restringSection(page)}/>
            </span>
            <ContactPane/>
        </div>
    );
}
