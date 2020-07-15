import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import {
    DashboardScreen,
    ContestScreen,
    ApplyContestScreen,
    SignInScreen,
    JudleClassesScreen,
    ArticlesScreen,
    ContestCategoryScreen,
    GalleryScreen,
    PrivacyAndConditionsScreen,
} from 'screens';

import TopBarNavigation from 'components/common/TopBarComponent';

function AppNavigation() {
    return (
        <React.Fragment>
            <Router>
                <TopBarNavigation />
                <Switch>
                    <Route path="/" component={DashboardScreen} exact />
                    <Route path="/apply-contest/:contest_id" component={ApplyContestScreen} />
                    {/** <Route path="explore-photos" component={} /> **/}
                    {/** <Route path="explore-photos/:photo_id" component={} /> **/}
                    <Route path="/contest/:contest_id" component={ContestScreen} />
                    <Route path="/all-contests" render={() => <div></div>}></Route>
                    <Route path="/community-contests" render={() => <div></div>}></Route>
                    <Route path="/sign-in" component={SignInScreen} />
                    <Route path="/sign-up" component={SignInScreen} />
                    <Route path="/judle-classes" component={JudleClassesScreen} />
                    <Route path="/articles" component={ArticlesScreen} />
                    <Route path="/photos" component={GalleryScreen} />
                    <Route path="/privacy" component={PrivacyAndConditionsScreen} />
                    <Route path="/contest-categories/:category_id" component={ContestCategoryScreen}></Route>
                    <Route path="*" render={() => <p className="not-found-component">Component not found.</p>} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default AppNavigation;
