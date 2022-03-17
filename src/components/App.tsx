import { Route, Switch } from "react-router-dom";
import Library from "components/Library";
import BookForm from "components/BookForm";
import MediaForm from "components/MediaForm";
import CategoryForm from "components/CategoryForm";
import CategoryTable from "components/CategoryTable";
import "styles/App.css";

function App() {
  return (
    <Switch>
      <Route path="/category/:id" component={CategoryForm} />
      <Route path="/categories/" component={CategoryTable} />
      <Route path="/book/:id" component={BookForm} />
      <Route path="/media/:id" component={MediaForm} />
      <Route path="/" component={Library} />
    </Switch>
  );
}

export default App;
