import React from "react";
import {whiteFilter} from "../util/Util";
import {Link} from "react-router-dom";
import {makeLinkSafe, content} from "./Menu";

export const ContactPane: React.FC<{page: string}> = ({page}) => {

    const nextSection: string = (() => {
        const keys = Object.keys(content);
        const index = keys.indexOf(page);
        if (index === keys.length - 1) return keys[0];
        return keys[index + 1]
    })();

    const nextStr = "> Next Up: ";

    return (
        <div className='ContactPane'>
            <span className="ContactPaneSpan">
                <Link to={makeLinkSafe(nextSection)}>
                        <h1 style={{fontWeight: 'normal'}}>{nextStr}{nextSection}</h1>
                </Link>
            </span>


            <a href="https://github.com/TobySalusky/MonoGameHtml">
                <img src="/MonoGameHtmlDocs/images/GithubLogo.png" alt="github" className='ContactPaneLogo' style={whiteFilter}/>
            </a>
        </div>
    );
}
