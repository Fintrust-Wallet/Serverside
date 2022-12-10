const accessControl = require("accesscontrol");
const ac = new accessControl();

exports.roles = (function () {
    ac.grant("visitor").readOwn("profile").updateOwn("profile");

    ac.grant("user").extend("visitor").readAny("profile");

    // ac.grant("admin")
    //     .extend("owner")
    //     .updateAny("profile")
    //     .deleteAny("profile");

    return ac;
})();
