import React from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import {
  DashboardScreen,
  ContestScreen,
  SignInScreen,
  JudleClassesScreen,
  AllArticlesScreen,
  GalleryScreen,
  PrivacyAndConditionsScreen,
  AllContestsScreen,
  ProfileScreen,
  ArticleDetailsScreen,
  GalleryPhotoScreen,
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
          <Route path="/contest/:contest_id" component={ContestScreen} />
          <Route path="/all-contests" component={AllContestsScreen}></Route>
          <Route
            path="/articles/:article_id"
            component={ArticleDetailsScreen}
          />
          <Route path="/sign-in" component={SignInScreen} />
          <Route path="/sign-up" component={SignInScreen} />
          <Route path="/judle-classes" component={JudleClassesScreen} />
          <Route path="/articles" component={AllArticlesScreen} />
          <Route path="/articles/:article_id" component={ArticleDetailsScreen} />
          <Route path="/gallery" exact={true} component={GalleryScreen} />
          <Route path="/gallery/all/:photo_id" component={GalleryPhotoScreen} />
          <Route path="/privacy-and-conditions" component={PrivacyAndConditionsScreen} />
          {isLoggedIn && <Route path="/profile-settings" component={ProfileScreen} />}
          <Route path="/about-us" component={AboutUsPageScreen} />
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
