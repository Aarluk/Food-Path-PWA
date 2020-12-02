import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { logout } from "../store";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // this.props.auth(this.state);
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    const { handleClick, isLoggedIn } = this.props;

    return (
      <div className="container-login">
        <div className="form-container">
          <div className="col-md-4 col-sm-4 col-xs-12">
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="userInput">
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />

                <Button
                  id="btn1"
                  href="/search"
                  variant="primary"
                  type="submit"
                  size="md"
                  block
                  onClick={handleClick}
                >
                  Let's Eat!
                </Button>
                <div>
                  <Button
                    id="btn2"
                    variant="outline-primary"
                    type="submit"
                    size="sm"
                    block
                    onClick={handleClick}
                  >
                    Sign in with Google
                  </Button>
                </div>

                <div>
                  <Button
                    id="btn3"
                    href="/registration"
                    variant="outline-info"
                    type="submit"
                    size="sm"
                    block
                    onClick={handleClick}
                  >
                    New here? Get on a Food Path!
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      // dispatch(logout());
    },
    // getLoggedInSearch: () => dispatch(fetchLoggedInSearch()),
    getUser: () => dispatch({ type: "GET_USER" }),
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   auth: (body) => dispatch(auth(body)),
// });

const loggedinUser = connect(mapState, mapDispatch)(Login);
export default withRouter(loggedinUser);

/**
 * PROP TYPES
 */
Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
