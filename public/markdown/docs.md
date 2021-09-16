# Docs

---

## The Basics

Before you can start rendering **HTML**, you will need to run `HtmlMain.Initialize` on your `Game` instance.

```cs
HtmlMain.Initialize(game);
```

### Generating HTML

The (*asynchronous*) `HtmlProcessor.GenerateRunner` method is how you will create a *UI-instance* from HTML-input.

Usage:
```cs
string html = @"
<div>
    <h3>Title</h3>
    <p>content</p>
</div>
";

HtmlRunner htmlInstance = await HtmlProcessor.GenerateRunner(html);
```
Rendered result:

<img src="/MonoGameHtmlDocs/images/examples/FirstUsage.png"/>


> **Note:** because the `GenerateRunner` method is **asynchronous**, it will either need to be handled as a `Task` or be `awaited` in an `async` context.

### The HtmlRunner

The end-result of a call to `HtmlProcessor.GenerateRunner` is an instance of the `HtmlRunner` class. 
This is what you will use to handle **HTML** in your **C#** code.

> This variable primarily handles **updating and rendering** of the **HTML**.

In your `Game`'s Update method, call:
```cs
htmlInstance?.Update(gameTime, Mouse.GetState(), Keyboard.GetState());
```
In your `Game`'s Render method, call:
```cs
htmlInstance?.Render(_spriteBatch);
```

---

## monoHTML Syntax

// TODO:

---

## Components

Not only do components allow you to **cut out repeated chunks of HTML**, 
but they also provide a method of **embedding C# code** to be run during the *HTML-generation process*.

---

## Writing Components

Creating your own **UI-components** is done similarly to how [**React-JS**](https://reactjs.org/) defines *functional-components*.

Here's the basic syntax:
```cs
const ComponentName = () => {
    
    // (insert C# code here)
    
    // return-statement yields an HtmlNode
    return (
        <html/>
    );
}
```

> **Note:** as of the current version, **it is required** that there exist an *un-nested* return statement **with parenthesis**. This will be changed later.

### Naming

UI-component names **must** begin with an uppercase-letter, with the remainder of the characters being *alphanumeric*. 
Their name must also be **unique** among the components used.

### Where to Write Them

You can write components in either `.monohtml` files or **C#** `strings`.

> **Tip:** multiline `strings` (which start with an @-symbol) are quite handy for writing **HTML**.

Additionally, it **does not matter how many** components you have per file or `string`. 
In fact, the placement of components **makes no change to their functionality**, it is a matter of 
organization **only**. Components can still reference each other, *even if written in different places*.

---

## Using Components

To use components in your UI, you will **need to add them** when creating your `HtmlRunner` instance.
This can be done by passing the `string[]` returned from `HtmlComponents.Create` as the *optional `components` parameter*.

When working with `strings`, this is simple enough:
```cs
string mainComponent = @"
const App = () => {
    return (
        <div backgroundColor='#f59b42'>
            <Comp1 a={4}/>
            <Comp2/>
        </div>
    );
}
";

string otherComponents = @"
const Comp1 = (int a = 0) => {
    return (<p>a is equal to {a}</p>);
}

const Comp2 = (float b = 0.5F) => {
    return (<p>b is equal to {b}</p>);
}
";

HtmlRunner htmlInstance = await HtmlProcessor.GenerateRunner("<App/>",
    components: HtmlComponents.Create(mainComponent, otherComponents));
```

<img src="/MonoGameHtmlDocs/images/examples/UsingComponents.png"/>


When working with `.monohtml` files, it's a little different.

`HtmlComponents.ReadFrom` takes in the **absolute path** to the folder containing your `.monohtml`
files, with a secondary, *optional* parameter to search it recursively (*the default is true*) and yields a raw-component `string`.

Now, in `HtmlComponents.Create`, we can use the result of `HtmlComponents.ReadFrom` just like any other component `string`.

```cs
HtmlRunner htmlInstance = await HtmlProcessor.GenerateRunner("<App/>",
    components: HtmlComponents.Create(HtmlComponents.ReadFrom(absolutePathToMonoHtmlFolder)));
```

---

## Component Parameters

Within the parenthesis following the *component-name*, parameters can be defined.

There are **three types** of parameters:

* Default-less (which force the parameter to be `Nullable`)
* Compile-time Defaulted (which work like they would in C#)
* Runtime Defaulted (which are evaluated if nothing or `null` is passed)

> as it stands, components can not have required parameters, but that is planned to change.

```cs
const Component = (int a, int b = 3, int c = 4, int d: (int)(@r * 40)) => {
    return (
        <p backgroundColor='gray'>{a.Value} {b} {c} {d}</p>
    );
}
```

Example:
```html
<Component a={-3 * 4} b={37}/>
```
yields


<img src="/MonoGameHtmlDocs/images/examples/Parameters.png"/>

> *While not part of the visible declaration*, there are actually ***4*** *optional (null-defaulted) parameters* 
> **present on every component**
>
> These Include:
> * props ` Dictionary<string, object>`
> * textContent `textContent`
> * children `HtmlNode[]`
> * childrenFunc `Func<HtmlNode[]>`
> 
> They can be used in the component-body just like any parameter

---

## Dynamic vs. Static Nodes

// TODO:

---

## Using Outside Data/Functionality 

### Importing

Your HTML-code will automatically import `MonoGameHtml`, `System`, `System.Collections.Generic`, `System.Linq`, `Microsoft.Xna.Framework`, and `Microsoft.Xna.Framework.Graphics`.

Importing is done by passing a `string[]` of the names of imported packages as the *optional `imports` parameter* when generating an instance.

```cs
var htmlInstance = await HtmlProcessor.GenerateRunner(html, 
    imports: new []{"System.IO"});
```

> **Note:** imports will apply to **all HTML-code** *including components* passed to the instance.


### Linking your Assembly

To reference *your own codebase*, you will need to link it as an `Assembly`.
> This allows use of any publicly-defined:
> * Classes, Interfaces, Structs, etc.

Many methods for getting a reference to your `Assembly` exist, but the simplest is to access the `.Assembly` property on the `typeof()` of a `class` defined in your code.

```cs
Assembly myAssembly = typeof(ClassInMyCodeBase).Assembly;
```

Linking assemblies is done by passing an `Assembly[]` as the *optional `assemblies` parameter* 
when generating an instance.

```cs
var htmlInstance = await HtmlProcessor.GenerateRunner(html, 
    assemblies: new []{myAssembly});
```

> **Note:** linking an assembly **will automatically import it**, so it ***should not*** be added as an additional import.

### Accessing and Updating Outside Variables

While you can access/update global variables in `static` contexts (*assuming your `Assembly` is linked*), this is not always something you want to be doing.

Another way of sharing variables between your **C#** and **monohtml** code is via a `StatePack`.

A `StatePack` is created by calling the `StatePack.Create()` method.

The `params` for this method should alternate between the `string` **name** the variable is to be referenced by, 
and the **starting value** for said variable (whose `Type` will determine that of the variable).

```cs
string str = "Hello World!";

float floatMethod() {
    return 5F;
}

// Creates a StatePack with three variable definitions (an int, a string, and a Func<float>).
var statePack = StatePack.Create(
    "number", 7,
    "str", str,
    "floatFunc", (Func<float>) floatMethod
);
```

> Calling `SetVar` or `SetVars` on a `StatePack` after its creation will accomplish the same thing as adding these directly in `StatePack.Create` (**assuming HTML-generation has not yet begun**).

The `StatePack` should be passed as the *optional `statePack` parameter* when generating the instance.

```cs
var htmlInstance = await HtmlProcessor.GenerateRunner(html, 
    statePack: statePack);
```

`monohtml` generated with this `StatePack` can now reference any variables it declared by **prefacing their reference-names with $-symbols**.

```cs
const PublicNumberDisplay = () => {
    // $number refers to an int of value 7
    return (
        <p>{$number}</p> 
    );
}
```

Within **monohtml**, these variables can be changed using the `UpdateVar` or `UpdateVars` method *at the global level*.

On the **C#** side, they can be accessed with the `HtmlRunner` instance's `GetVar<T>` method and edited using its `UpdateVar` method.

> **Note:** These variables **must** exist at HTML-compile time. Only variables that were declared in `StatePack.Create` 
> or a `StatePack.SetVar`/`StatePack.SetVars` called **before** beginning *HTML-generation* will be valid. 

---

## State

Because `HtmlNodes` are already equipped with the ability to recalculate text and certain attributes per-frame, 
*the only real reason* to use **state** is when you want to regenerate a node's `children`.

**State** can be used in components via the `useState` hook.

The syntax for the `useState` hook follows that of *React*:
```cs
T [value, setValue] = useState(initialValue);
```
**Two reference-names** are provided within **square brackets**, of which the first is the state variable, 
being of type `T` while the other is a setter for this variable, being of type `Action<T>`.

When the setter is called for a state-variable, ***ALL*** **dynamic** `HtmlNodes` returned
will rebuild their children.

> **Note:** if a state variable is not changed **using its setter**, *nothing will occur*.

Example:
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

<img src="/MonoGameHtmlDocs/images/examples/State.gif"/>

