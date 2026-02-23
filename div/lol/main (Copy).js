import BrowserDetector from './browser.js';

var n = 0;
document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const detector = new BrowserDetector(window.navigator.userAgent);

const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) };

const sumDicts = (dictionaries) => {
    const result = {};
    dictionaries.forEach(dictionary => {
        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                if (result.hasOwnProperty(key)) {
                    if (typeof dictionary[key] === 'number' && typeof result[key] === 'number') {
                        result[key] += dictionary[key];
                    } else {
                        console.error('Unsupported data type for key:', key);
                    }
                } else {
                    result[key] = dictionary[key];
                }
            }
        }
    });
    return result;
}

const filterTruthyValues = (obj) => {
    const filteredDict = {};
    Object.keys(obj).forEach(key => { if (obj[key] !== false) { filteredDict[key] = obj[key]; } });
    return filteredDict;
}

// Add CSS for smooth transitions and bigger text
const style = document.createElement('style');
style.textContent = `
    #rekt {
        font-family: monospace;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 0 5px rgba(255,255,255,0.5);
        line-height: 1.5;
    }
    .info-line {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .info-line.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const data = filterTruthyValues(detector.parseUserAgent())

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const basic = await (await fetch('https://wtfismyip.com/json')).json();

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const systemInfo = {
    'System Languages': navigator.languages.join(', '),
    'Screen Width': `${screen.width}px`,
    'Screen Height': `${screen.height}px`,
};

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

if (screen.width !== window.width || screen.height !== window.height) {
    systemInfo['Window Width'] = `${window.outerWidth}px`;
    systemInfo['Window Height'] = `${window.outerHeight}px`;
}

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

systemInfo['Display Pixel Depth'] = screen.pixelDepth;

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

if (typeof screen.orientation !== 'undefined') {
    systemInfo['Screen Orientation'] = screen.orientation.type.split('-')[0];
    systemInfo['Screen Rotation'] = `${screen.orientation.angle} degrees`;
}

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

systemInfo['CPU Threads'] = navigator.hardwareConcurrency;

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

systemInfo['Available Browser Memory'] = typeof window.performance.memory !== 'undefined' ?
    `${Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)} MB` : null;

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

systemInfo['Total RAM'] = navigator.deviceMemory * 1024 + "Mb";

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const canvas = document.createElement('canvas');
systemInfo['Gpu Vendor'] = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getParameter((canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL);
systemInfo['Gpu Info'] = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getParameter((canvas.getContext('webgl') || canvas.getContext('experimental-webgl')).getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);

document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

document.getElementById('b').innerHTML = '<button id="launch">Launch</button>'

const load = async () => {
    const combinedData = sumDicts([basic, data, systemInfo]);
    const repl = { "YourFucking": "", "is": "Using ", "name": "Browser", "version": "Browser Version", "shortVersion": "Short Browser Version" };
    
    // Clear existing content
    document.getElementById("rekt").innerHTML = '';
    
    for (const element of Object.keys(combinedData)) {
        let p = element;
        Object.keys(repl).forEach(e => {
            p = p.replace(e, repl[e]);
        });
        
        // Create new line element
        const line = document.createElement('div');
        line.className = 'info-line';
        line.innerHTML = `${p}: ${combinedData[element]}`;
        document.getElementById("rekt").appendChild(line);
        
        // Trigger animation
        setTimeout(() => {
            line.classList.add('visible');
        }, 10);
        
        await sleep(200); // Reduced delay between lines
    }
}

document.getElementById("launch").addEventListener("click", async (eeee) => {
    document.getElementById("b").style.display = "none";
    document.getElementById("myVideo").play();
    await load();
});