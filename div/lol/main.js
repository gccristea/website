import BrowserDetector from './browser.js';

// Debugging
console.log("Script loaded");

var n = 0;
document.getElementById("b").innerHTML = 8 * n + "%"; n += 1;

const detector = new BrowserDetector(window.navigator.userAgent);

const sleep = (milliseconds) => { 
    return new Promise(resolve => setTimeout(resolve, milliseconds)) 
};

// Add minimal CSS for transitions only
const style = document.createElement('style');
document.head.appendChild(style);

// Main function to gather all data
const gatherData = async () => {
    try {
        const data = filterTruthyValues(detector.parseUserAgent());
        const basic = await (await fetch('https://wtfismyip.com/json')).json();
        
        const systemInfo = {
            'System Languages': navigator.languages.join(', '),
            'Screen Width': `${screen.width}px`,
            'Screen Height': `${screen.height}px`,
            'Display Pixel Depth': screen.pixelDepth,
            'CPU Threads': navigator.hardwareConcurrency,
            'Total RAM': navigator.deviceMemory ? `${navigator.deviceMemory * 1024}Mb` : 'Unknown'
        };

        if (screen.width !== window.outerWidth || screen.height !== window.outerHeight) {
            systemInfo['Window Width'] = `${window.outerWidth}px`;
            systemInfo['Window Height'] = `${window.outerHeight}px`;
        }

        if (typeof screen.orientation !== 'undefined') {
            systemInfo['Screen Orientation'] = screen.orientation.type.split('-')[0];
            systemInfo['Screen Rotation'] = `${screen.orientation.angle} degrees`;
        }

        if (typeof window.performance.memory !== 'undefined') {
            systemInfo['Available Browser Memory'] = 
                `${Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)} MB`;
        }

        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    systemInfo['GPU Vendor'] = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                    systemInfo['GPU Info'] = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            }
        } catch (e) {
            console.warn("Could not get GPU info:", e);
        }

        return sumDicts([basic, data, systemInfo]);
    } catch (error) {
        console.error("Error gathering data:", error);
        return { 'Error': 'Could not gather all system information' };
    }
};

// Display function
const displayData = async (combinedData) => {
    const repl = { 
        "YourFucking": "", 
        "is": "Using ", 
        "name": "Browser", 
        "version": "Browser Version", 
        "shortVersion": "Short Browser Version" 
    };
    
    const rektElement = document.getElementById("rekt");
    rektElement.innerHTML = '';
    
    for (const element of Object.keys(combinedData)) {
        let p = element;
        Object.keys(repl).forEach(e => {
            p = p.replace(e, repl[e]);
        });
        
        const line = document.createElement('div');
        line.className = 'info-line';
        line.textContent = `${p}: ${combinedData[element]}`;
        rektElement.appendChild(line);
        
        setTimeout(() => {
            line.classList.add('visible');
        }, 10);
        
        await sleep(200);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded");

    const launchBtnId = "launch";
    const bEl = document.getElementById('b');

    // Insert disabled button
   bEl.innerHTML = `<button id="${launchBtnId}" disabled style="font-size: 1.5em;">loading, please wait...</button>`;
    const launchBtn = document.getElementById(launchBtnId);

    let systemData;

    try {
        // Pre-fetch data first
        systemData = await gatherData();

        // Enable the button after data is ready
        launchBtn.textContent = "START";
        launchBtn.disabled = false;

        // Now attach the click handler
        launchBtn.addEventListener("click", async () => {
            console.log("Launch button clicked");

            // Load and play video only now
            const video = document.getElementById("myVideo");
            const source = document.createElement('source');
            source.src = "te.mp4";
            source.type = "video/mp4";
            video.appendChild(source);

            video.play().catch(e => console.error("Video play error:", e));

            bEl.style.display = "none";

            try {
                await displayData(systemData);
            } catch (error) {
                console.error("Error displaying data:", error);
                document.getElementById("rekt").innerHTML =
                    '<div>Error displaying system information</div>';
            }
        });
    } catch (error) {
        console.error("Error preloading data:", error);
        bEl.innerHTML = `<div>Error gathering system information. Please refresh.</div>`;
    }
});


// Helper functions
function filterTruthyValues(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== false)
    );
}

function sumDicts(dictionaries) {
    return dictionaries.reduce((result, dict) => {
        for (const [key, value] of Object.entries(dict)) {
            result[key] = typeof value === 'number' && typeof result[key] === 'number' 
                ? result[key] + value 
                : value;
        }
        return result;
    }, {});
}