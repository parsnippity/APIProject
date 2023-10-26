const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated will return true if the user is logged in
        next()
    } else {
        req.flash("error_msg", "please login to do this")
        res.redirect("/users/login");
    }
}
module.exports = {ensureAuthenticated};
//ensure authenticated verifies if the user has logged in using passport's authentication. it will return back a true (if they're logged in) or false(if they're not).