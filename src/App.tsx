import './App.css';
// @ts-ignore
import rehypeRaw from 'rehype-raw'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ContentPage} from "./pages/ContentPage";


function App() {
    return (
        // @ts-ignore
        <Router history={History}>
            <Switch>
                <Route path ='/MonoGameHtmlDocs' component={ContentPage}/>
            </Switch>
        </Router>
    );
}

export default App;
