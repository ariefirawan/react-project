import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import { auth, createUserDoc } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //awalnya this.props.setCurrentUser <= sebuah function yang memiliki parameter(user) dan di isi dengan userRef.on snapShot atau userAuth
    // const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   console.log(userAuth);
    //   if (userAuth) {
    //     const userRef = await createUserDoc(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({ id: snapShot.id, ...snapShot.data() });
    //     });
    //   }
    //   setCurrentUser(userAuth);
      // console.log(userAuth);
      // addCollectionAndDocuments(
      //   'collections',
      //   collectionsarray.map(({ title, items }) => ({ title, items }))
      // );
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            expath
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
//destructuring user
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsarray: selectCollectionsForPreview
});

export default connect(mapStateToProps)(App);
