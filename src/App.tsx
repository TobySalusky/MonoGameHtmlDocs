import './App.css';
// @ts-ignore
import rehypeRaw from 'rehype-raw'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {ContentPage} from "./pages/ContentPage";

function App() {
    return ( // @ts-ignore
        <HashRouter basename="/">
            <Switch>
                <Route path="/monogamehtml">
                    <ContentPage page='monogamehtml'/>
                </Route>
                <Route path="/getting_started">
                    <ContentPage page='getting_started'/>
                </Route>
                <Route path="/docs">
                    <ContentPage page='docs'/>
                </Route>
                <Route path="/styling_docs">
                    <ContentPage page='styling_docs'/>
                </Route>
                <Route path="/" exact>
                    <Redirect to="/monogamehtml"/>
                </Route>
            </Switch>
        </HashRouter>
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
