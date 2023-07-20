import React from "react";
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  const usersId = [1, 2, 3, 4, 5];
  const HomePage = () => {
    return (
      <>
        <h2>Home page</h2>
        <NavLink to="/users">Users list page</NavLink>
      </>
    );
  };

  const UsersList = () => {
    let { path } = useRouteMatch();
    return (
      <>
        <h2>Users list page</h2>
        <ul>
          {usersId.map((el) => (
            <li key={el}>
              <NavLink
                to={path + `/${el}`}                
              >
                User: {el}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/">Home page</NavLink>
          </li>
        </ul>
      </>
    );
  };

  const UserPage = () => {
    const { url, params } = useRouteMatch();
    return (
      <>
        <h2>User #{params.userId} page </h2>
        <ul>
          <li>
            <NavLink to="/users">Users list page</NavLink>
          </li>
          <li>
            <NavLink to={url + "/edit"}>User edit page</NavLink>
          </li>
        </ul>
      </>
    );
  };

  const UserEditPage = () => {
    const { userId } = useParams();
    const nextUserId = (id) => {
      if (+id < usersId.length) {
        return +id + 1;
      } else {
        id = 1;
        return id;
      }
    };
    return (
      <>
        <h2>User #{userId} edit page</h2>
        <ul>
          <li>
            <NavLink to="/">Home page</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users list page</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={`/users/${userId}`}>Go back to user page</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={`/users/${nextUserId(userId)}`}>
              Another user page
            </NavLink>
          </li>
        </ul>
      </>
    );
  };

  return (
    <div className="App">
      <h1>React router 5 app</h1>
      <Switch>
        <Route path="/users/:userId/edit" component={UserEditPage} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={UsersList} />
        <Route path="/" exact component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;
