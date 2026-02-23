const getNavigator = () => typeof window !== 'undefined' ? window.navigator : null;
const KnownBrowsers = { chrome: 'Google Chrome', brave: 'Brave', crios: 'Google Chrome', edge: 'Microsoft Edge', edg: 'Microsoft Edge', edgios: 'Microsoft Edge', fennec: 'Mozilla Firefox', jsdom: 'JsDOM', mozilla: 'Mozilla Firefox', fxios: 'Mozilla Firefox', msie: 'Microsoft Internet Explorer', opera: 'Opera', opios: 'Opera', opr: 'Opera', opt: 'Opera', rv: 'Microsoft Internet Explorer', safari: 'Safari', samsungbrowser: 'Samsung Browser', electron: 'Electron' };
const KnownPlatforms = { 'android': 'Android', 'androidTablet': 'Android Tablet', 'cros': 'Chrome OS', 'fennec': 'Android Tablet', 'ipad': 'IPad', 'iphone': 'IPhone', 'jsdom': 'JsDOM', 'linux': 'Linux', 'mac': 'Macintosh', 'tablet': 'Android Tablet', 'win': 'Windows', 'windows phone': 'Windows Phone', 'xbox': 'Microsoft Xbox' };
const toFixed = (val, fixed = -1) => (Number(val).toString().match(new RegExp(`^-?\\d+(?:.\\d{0,${fixed}})?`)) || [])[0];
class BrowserDetector {
    constructor(inputUA) {
        this.userAgent = inputUA || getNavigator()?.userAgent || null;
    }

    parseUserAgent(userAgent) {
        const browserMatches = {};
        const uaFresh = userAgent || this.userAgent || '';

        const ua = uaFresh.toLowerCase().replace(/\s\s+/g, ' ');
        const browserMatch =
            /(edge)\/([\w.]+)/.exec(ua) ||
            /(edg)[/]([\w.]+)/.exec(ua) ||
            /(opr)[/]([\w.]+)/.exec(ua) ||
            /(opt)[/]([\w.]+)/.exec(ua) ||
            /(fxios)[/]([\w.]+)/.exec(ua) ||
            /(edgios)[/]([\w.]+)/.exec(ua) ||
            /(jsdom)[/]([\w.]+)/.exec(ua) ||
            /(samsungbrowser)[/]([\w.]+)/.exec(ua) ||
            /(electron)[/]([\w.]+)/.exec(ua) ||
            /(chrome)[/]([\w.]+)/.exec(ua) ||
            /(crios)[/]([\w.]+)/.exec(ua) ||
            /(opios)[/]([\w.]+)/.exec(ua) ||
            /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(ua) ||
            /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(ua) ||
            /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(ua) ||
            /(webkit)[/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            /(fennec)[/]([\w.]+)/.exec(ua) ||
            ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        const platformMatch =
            /(ipad)/.exec(ua) ||
            /(ipod)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(jsdom)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(xbox)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(tablet)/.exec(ua) ||
            /(android)/.test(ua) && /(mobile)/.test(ua) === false && ['androidTablet'] ||
            /(android)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/.exec(ua) ||
            [];

        const name = browserMatch[5] || browserMatch[3] || browserMatch[1] || null;
        const platform = platformMatch[0] || null;
        const version = browserMatch[4] || browserMatch[2] || null;

        const isAndroid = Boolean(browserMatches.tablet || browserMatches.android || browserMatches.androidTablet);
        const isTablet = Boolean(browserMatches.ipad || browserMatches.tablet || browserMatches.androidTablet);
        const isMobile = Boolean(
            browserMatches.android || browserMatches.androidTablet || browserMatches.tablet ||
            browserMatches.ipad || browserMatches.ipod || browserMatches.iphone || browserMatches['windows phone']
        );
        const isDesktop = Boolean(browserMatches.cros || browserMatches.mac || browserMatches.linux || browserMatches.win);
        const isIE = Boolean(browserMatches.msie || browserMatches.rv);

        const browserInfo = {
            name: KnownBrowsers[name] || null,
            platform: KnownPlatforms[platform] || null,
            userAgent: ua,
            version: version,
            shortVersion: version ? toFixed(parseFloat(version), 2) : null,
            isAndroid: Boolean(browserMatches.tablet || browserMatches.android || browserMatches.androidTablet),
            isTablet: Boolean(browserMatches.ipad || browserMatches.tablet || browserMatches.androidTablet),
            isMobile: Boolean(browserMatches.android || browserMatches.androidTablet || browserMatches.tablet || browserMatches.ipad || browserMatches.ipod || browserMatches.iphone || browserMatches['windows phone']),
            isDesktop: Boolean(browserMatches.cros || browserMatches.mac || browserMatches.linux || browserMatches.win),
            isIE: Boolean(browserMatches.msie || browserMatches.rv),
        };
        return browserInfo;
    }

    getBrowserInfo() {
        const browserInfo = this.parseUserAgent();
        return {
            name: browserInfo.name,
            platform: browserInfo.platform,
            userAgent: browserInfo.userAgent,
            version: browserInfo.version,
            shortVersion: browserInfo.version ? toFixed(parseFloat(browserInfo.version), 2) : null,
        };
    }

    static get VERSION() {
        return version;
    }
}
export default BrowserDetector;
