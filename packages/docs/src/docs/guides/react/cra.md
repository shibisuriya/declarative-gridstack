# Using @declarative-gridstack/react in react projects scaffolded using CRA (create-react-app)

If you have a React application scaffolded with CRA (create-react-app), it is recommended to remove the <React.StrictMode> component from the index.js file.

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

To,

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```
