import React from "react";
import {whiteFilter} from "../util/Util";
import {useMediaQuery} from "react-responsive";

export const NavBar: React.FC = () => {

    const displayText = useMediaQuery({ minWidth: 700 });
    const displayTitle = useMediaQuery({ minWidth: 600 });

    return (
        <div className='NavBar'>
            <div className='NavBarContent'>
                <span className='InlineCenter'>
                    <a href="https://www.monogame.net/">
                        <img src="/MonoGameHtmlDocs/images/MonoGameLogo.png" alt="monogame" className='NavBarLogo'/>
                    </a>
                    {displayTitle && <h1>MonoGameHtml</h1>}
                </span>
                    <a href="https://github.com/TobySalusky/MonoGameHtml">
                    <span className='InlineCenter'>
                        {displayText && <h2 style={{marginRight: 10}}>Github</h2>}
                        <img src="/MonoGameHtmlDocs/images/GithubLogo.png" alt="github" className='NavBarLogo' style={whiteFilter}/>
                    </span>
                    </a>

                </div>
        </div>
    );
}
