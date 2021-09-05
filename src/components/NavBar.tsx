import React from "react";
import {whiteFilter} from "../util/Util";

export const NavBar: React.FC = () => {
    return (
        <div className='NavBar'>
            <div className='NavBarContent'>
                <span className='InlineCenter'>
                    <a href="https://www.monogame.net/">
                        <img src="/MonoGameHtmlDocs/images/MonoGameLogo.png" alt="monogame" className='NavBarLogo'/>
                    </a>
                    <h1>MonoGameHtml</h1>
                </span>
                    <a href="https://github.com/TobySalusky/MonoGameHtml">
                    <span className='InlineCenter'>
                        <h2 style={{marginRight: 10}}>Github</h2>
                        <img src="/MonoGameHtmlDocs/images/GithubLogo.png" alt="github" className='NavBarLogo' style={whiteFilter}/>
                    </span>
                    </a>

                </div>
        </div>
    );
}
