import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const content: {[key: string]: string[]} = {
    'MonoGameHtml': [
        'What is it?'
    ],
    'Getting Started': [
        'Setup'
    ],
    'Docs': [
        'The Basics',
        'monoHTML Syntax',
        'Components',
        'Writing Components',
        'Using Components',
        'Component Parameters',
        'Dynamic vs. Static Nodes',
        'Using Outside Data/Functionality',
        'State',
    ],
    'Styling Docs': [
        'The Basics',
        'Fonts',
        'Currently-Implemented Style Attributes',
    ]
};

const makeLinkSafe = (str: string) => {
    return str.replaceAll(' ', '_').toLowerCase();
}

const sectionLinkMap = (()=>{
    const dict: {[key: string]: string} = {};
    for (const key of Object.keys(content)) {
        dict[makeLinkSafe(key)] = key;
    }
    return dict;
})();

export const restringSection = (linkSafe: string) => {
    return sectionLinkMap[linkSafe];
}



export const Menu: React.FC<{page: string}> = ({page}) => {

    const headerList = content[page];

    const [active, setActive] = useState(headerList[0] ?? '');

    const recalc = () => {
        // TODO:
        //console.log('calc!')
        /*const mdPane = document.getElementById('MarkdownPane');
        if (!mdPane) return;
        const elems = mdPane.getElementsByTagName('h2');
        const newHeaderList: string[] = [];
        console.log(334)
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            if (elem.textContent) newHeaderList.push(elem.textContent);
            console.log(elem.textContent)
        }
        setHeaderList(newHeaderList);*/
    }

    const onScroll = () => { // TODO: optimize! only use client rect in recalc, then use scroll.y!!
        //const currY = window.scrollY;
        //console.log(currY)
        const elems = document.getElementsByTagName('h2');
        let currTop = headerList[0];
        for (let i = 0; i < elems.length; i++) {
            const elem = elems[i];
            const text = String(elem.textContent);

            if (!headerList.includes(text)) continue;

            if (elem.getClientRects()[0].y <= 200) {
                currTop = text;
            }
        }
        setActive(currTop);
    }

    useEffect(() => {
        setActive(headerList[0] ?? '');

        const observer = new MutationObserver(recalc);
        // @ts-ignore
        observer.observe(document.getElementById('root'), {
            childList: true,
            subtree: true,
        });
        window.addEventListener('scroll', onScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
        }
    }, [page]);

    return (
        <div className='MenuWrapper'>
            <div className='Menu'>
                {Object.keys(content).map(thisSection => {
                    if (thisSection === page) {
                        return (
                            <>
                                <h3 style={{cursor: 'pointer'}} onClick={() => {
                                    // eslint-disable-next-line no-restricted-globals
                                    scrollTo({left: 0, top: 0, behavior: 'smooth'});
                                }}>{thisSection}</h3>
                                <ul>
                                    {headerList.map(header =>
                                        <li key={header} id={`menu-${header}`} onClick={event => {
                                            event.preventDefault();
                                            const elems = document.getElementsByTagName('h2');
                                            for (let i = 0; i < elems.length; i++) {
                                                const elem = elems[i];
                                                if (elem.textContent === header) {
                                                    elem?.scrollIntoView({behavior: 'smooth', block: 'start'});
                                                    break;
                                                }
                                            }
                                        }} style={{fontWeight: active === header ? 'bold' : 'normal'}}>
                                            <p>{header}</p>
                                        </li>
                                    )}
                                </ul>
                            </>
                        );
                    }
                    return (
                        <Link to={makeLinkSafe(thisSection)}>
                            <h3 style={{fontWeight: 'normal'}}>{thisSection}</h3>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
