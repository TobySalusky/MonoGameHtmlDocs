# MonoGameHtml

---

## What is it?

**MonoGameHtml** aims to recreate the web-dev [**React-JS**](https://reactjs.org/) experience for creating performant, stylish UI using C# in `MonoGame`.

**Build user interfaces using:**
* Dynamic HTML
* CSS styling
* Functional Components
* Live Editing 🔥

---

## Example

```cs
const App = () => {
    int [childCount, setChildCount] = useState(1);
    
    return (
        <div onPress={()=>{
            setChildCount(childCount + 1);
        }}>
            {nStream(childCount).map(i => 
                <h4 borderWidth={1} borderColor='black' backgroundColor='lightgray'>{i}</h4>
            )}
        </div>
    );
}
```

<img src="/MonoGameHtmlDocs/images/examples/State.gif" class="MaxImg"/>

---

## Instant Preview Editor

<img src="/MonoGameHtmlDocs/images/examples/Editor.PNG" class="MaxImg"/>


