import './App.css';
// @ts-ignore
import rehypeRaw from 'rehype-raw'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ContentPage} from "./pages/ContentPage";
// @ts-ignore
import MetaTags from "react-meta-tags";
import History from "./util/History";


function App() {
    return ( // @ts-ignore
        <Router history={History}>
            <Switch>
                <Route exact path="/MonoGameHtmlDocs">
                    <Redirect to="/MonoGameHtmlDocs/monogamehtml"/>
                </Route>
                <Route path ='/MonoGameHtmlDocs/:page' component={ContentPage}/>
            </Switch>

            <MetaTags>
                <title>MonoGameHtml</title>
                <meta id="meta-description" name="description" content=""/>
                <meta id="og-title" property="og:title" content="MonoGameHtml"/>
                <meta id="og-image" property="og:image" content="/MonoGameHtmlDocs/images/MonoGameLogo.png"/>
            </MetaTags>
        </Router>
    );
}
//
// <MetaTags>
//     <title>MonoGameHtml</title>
//     <meta id="meta-description" name="description" content="" />
//     <meta id="og-title" property="og:title" content="MonoGameHtml"/>
//     <meta id="og-image" property="og:image" content=""/>
// </MetaTags>

export default App;
