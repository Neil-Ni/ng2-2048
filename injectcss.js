window.injectCSS = function(c) {
    var d = document,
    a = 'appendChild',
    i = 'styleSheet',
    s = d.createElement('style'),
    c = c.default || c;
    s.type = 'text/css';
    d.getElementsByTagName('head')[0][a](s);
    s[i] ? s[i].cssText = c : s[a](d.createTextNode(c));
}
