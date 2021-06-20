import React from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import {
  DashboardScreen,
  ContestScreen,
  SignInScreen,
  // JudleClassesScreen,
  AllArticlesScreen,
  GalleryScreen,
  PrivacyAndConditionsScreen,
  AllContestsScreen,
  ProfileScreen,
  ArticleDetailsScreen,
  GalleryDetailsScreen,
  AboutUsPageScreen,
} from "screens";

import TopBarNavigation from "components/common/TopBar";
import Footer from "components/common/Footer";

function AppNavigation() {
  const { isLoggedIn } = useSelector(({ auth }) => auth);

  return (
    <React.Fragment>
      <Router>
        <TopBarNavigation />
        <Switch>
          <Route path="/" component={DashboardScreen} exact />
          <Route path="/contests/all/:contest_id" component={ContestScreen} />
          <Route path="/contests" component={AllContestsScreen} />
          <Route path="/articles" component={AllArticlesScreen} />
          <Route path="/articles/all/:article_id" component={ArticleDetailsScreen} />
          <Route path="/gallery" exact={true} component={GalleryScreen} />
          <Route path="/gallery/all/:photo_id" component={GalleryDetailsScreen} />
          <Route path="/privacy-and-conditions" component={PrivacyAndConditionsScreen} />
          <Route path="/about-us" component={AboutUsPageScreen} />
          {isLoggedIn ? (<React.Fragment>
              <Route path="/profile-settings" component={ProfileScreen} />
              <Route path="/sign-in" render={() => <Redirect to="/gallery" />} />
            </React.Fragment>) : (
            <React.Fragment>
              <Route path="/sign-in" component={SignInScreen} />
              <Route path="/sign-up" component={SignInScreen} />
            </React.Fragment>
          )}
          <Route
            path="*"
            render={() => (
              <div className="page-not-found">
                <p>Requested page not found.</p>
              </div>
            )}
          />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default AppNavigation;
