function getVideo() {
    document.documentElement.setAttribute('normal_video', true)
    try{document.getElementById('embededVideo').remove()}catch(err){}
    const iframe = document.createElement('iframe');
    iframe.id = 'embededVideo'
    iframe.style.width = '-webkit-fill-available';
    iframe.style.height = '-webkit-fill-available'; 
    iframe.src = location.href.replace('watch?v=', 'embed/');
    waitForElm('#player').then((elm) => {
        const container = document.querySelectorAll('#container.ytd-player')[0];
        setTimeout(function() {container.appendChild(iframe)}, 2000)//timeout is added because for some reasone the iframe is being removed after its added immediately
    });
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

document.documentElement.setAttribute('normal_video', false)
waitForElm('#container').then((elm) => {
    if (location.href.includes('watch')) {getVideo()}
});

let currentPage = location.href;
setInterval(function(){
    if (currentPage != location.href) {
        currentPage = location.href;
        try{document.getElementById('embededVideo').remove()}catch(err){}
        document.documentElement.setAttribute('normal_video', false)
        if (location.href.includes('watch')) {getVideo()}
    }
}, 500);
