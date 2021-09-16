import './App.css';
// @ts-ignore
import rehypeRaw from 'rehype-raw'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ContentPage} from "./pages/ContentPage";
// @ts-ignore
import History from "./util/History";


function App() {
    return ( // @ts-ignore
        <Router history={History}>
            <Switch>
                <Route path="/MonoGameHtmlDocs" exact>
                    <Redirect to="/MonoGameHtmlDocs/monogamehtml"/>
                </Route>
                <Route path="/MonoGameHtmlDocs/monogamehtml" exact>
                    <ContentPage page='monogamehtml'/>
                </Route>
                <Route path="/MonoGameHtmlDocs/getting_started" exact>
                    <ContentPage page='getting_started'/>
                </Route>
                <Route path="/MonoGameHtmlDocs/docs" exact>
                    <ContentPage page='docs'/>
                </Route>
                <Route path="/MonoGameHtmlDocs/styling_docs" exact>
                    <ContentPage page='styling_docs'/>
                </Route>
            </Switch>
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
