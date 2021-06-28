function Pop() {
    const cssRuleFile = "/stylesheets/modalConsent.css";
    let lnk = document.createElement("link");
    lnk.setAttribute("rel", "stylesheet");
    lnk.setAttribute("type", "text/css");
    lnk.setAttribute("href", cssRuleFile);
    document.getElementsByTagName("head")[0].appendChild(lnk);
    let conDivObj;
    let fadeInTime = 10;
    let fadeOutTime = 10;
    let cookie = {
        name: "cookieconsent_status",
        path: "/",
        expiryDays: 6 * 24 * 60 * 60 * 1000,
    };
    let content = {
        message: "This website uses cookies to ensure you get the best experience on our website.",
        btnText: "Got it!",
        mode: "  banner bottom",
        theme: " theme-classic",
        palette: " palette",
        link: "Learn more",
        href: "https://www.cookiesandyou.com",
        target: "_blank",
    };
    let createPopUp = function() {
        if (typeof conDivObj === "undefined") {
            conDivObj = document.createElement("DIV");
            conDivObj.style.opacity = "0.0";
            conDivObj.setAttribute("id", "spopupCont");
        }
        conDivObj.innerHTML = '<div id="poper" class="window ' +
            content.mode +
            content.theme +
            content.palette +
            '"><span id="msg" class="message">' +
            content.message +
            '<a id="plcy-lnk" class="policylink" href="' +
            content.href +
            '"' +
            " target=" +
            content.target +
            ">" +
            content.link +
            '</a></span><div id="btn" class="compliance"><a href="#" id="cookie-btn" class="spopupbtnok" >' +
            content.btnText;
        document.body.appendChild(conDivObj);
        fadeIn(conDivObj);
        document.getElementById("cookie-btn").addEventListener("click", function() {
            saveCookie();
            fadeOut(conDivObj);
        });
    };
    let fadeOut = function(element) {
        let op = 1;
        let timer = setInterval(function() {
            if (op <= 0.1) {
                clearInterval(timer);
                conDivObj.parentElement.removeChild(conDivObj);
            }
            element.style.opacity = op;
            element.style.filter = "alpha(opacity=" + op * 100 + ")";
            op -= op * 0.1;
        }, fadeOutTime);
    };
    let fadeIn = function(element) {
        let op = 0.1;
        let timer = setInterval(function() {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = "alpha(opacity=" + op * 100 + ")";
            op += op * 0.1;
        }, fadeInTime);
    };
    let checkCookie = function(key) {
        return !!document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    };
    let saveCookie = function() {
        let expires = new Date();
        expires.setTime(expires.getTime() + cookie.expiryDays);
        document.cookie = cookie.name +
            "=" +
            "ok" +
            ";expires=" +
            expires.toUTCString() +
            "path=" +
            cookie.path;
    };
    this.init = function() {
        if (checkCookie(cookie.name)) return;
        setTimeout(function() {
            createPopUp();
        }, 5 * 1000);
    };
}
window.start = new Pop();