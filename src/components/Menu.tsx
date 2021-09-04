import React, {useEffect, useState} from "react";

export const Menu: React.FC = () => {

    const [active, setActive] = useState(0);

    const onScroll = () => {
        // TODO:
    }

    const recalc = () => {
        // TODO:
    }

    useEffect(() => {
        const observer = new MutationObserver(recalc);
        // @ts-ignore
        observer.observe(document.getElementById('root'), {
            childList: true,
            subtree: true,
        });
        window.addEventListener('scroll', onScroll);
    }, []);


    const headerList = [
        'fonts',
        'state'
    ];

    console.log(headerList)

    return (
        <div>
            <ul>
                {headerList.map(header =>
                    <li key={header} id={`header-${header}`} onClick={event => {
                        console.log('hello')
                        event.preventDefault();
                        const elem = document.getElementById(`header-${header}`);
                        console.log(elem,`header-${header}` )
                        console.log('fejwaiofeajwiof!~')
                        elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}>{header}</li>
                )}
            </ul>
        </div>
    );
}
