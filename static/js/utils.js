// strip string of any unsafe css chars
const cssSafe = (inputString) => {
    if (inputString) {
        return inputString.replace(/\W/g, '')
    }
    return ""
}

// RegEx matches the input against the IETF standard for URLs
const validateUrl = (value) =>
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
    )

// adds the same function fn for multiple events s to element el
const addListenerMulti = (el, s, fn) => {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

// calculates the needed width of a text using a DOM-Element
const calcTextWidth = (text) => {
    let el = document.querySelector("#text-width-test")
    el.innerHTML = text;

    return Math.ceil(el.clientWidth);
}

// property key to name
const propertyName = (property) => {
    if (columnsReady) {
        try {
            return window.columns["keys"][property]["name"]
        } catch (e) {
            console.error("Property", property, "has no name", e)
        }
    }
    return "???"
}

// property key to description
const propertyDescription = (property) => {
    if (columnsReady) {
        try {
            return window.columns["keys"][property]["description"]
        } catch (e) {
            console.error("Property", property, "has no description", e)
        }
    }
    return "???"
}

const checkOnlineStatus = async (server) => {
    if (!server) {
        server = "https://piracy.moe"
    }
    if (server.slice(server.length - 1) === "/") {
        server = server.slice(0, -1);
    }


    const status = await fetch("https://ping.piracy.moe/ping", {
        method: 'post',
        body: JSON.stringify({"url": server}),
        headers: new Headers({'content-type': 'application/json'})
    }).then(response => {
        if (!response.ok) {
            console.error("Ping-System response is not ok for", server, response)
        }
        return response.json()
    }).catch(error => {
        // well for other errors like timeout, ssl or connection error...
        console.error("Unable to complete ping-request of ", server, "due to:", error)
        return false
    })

    window.online[status["url"]] = status["status"]
    return status
}

// log to console the async loading status
const loadingLog = () => {
    console.log("tablesGenerated:", tablesGenerated, "columnsReady:", columnsReady, "tablesReady:", tablesReady, "domReady:", domReady)
}

// displays an info modal of a table row
const showInfoModal = (row) => {
    const data = row.getData()
    console.log("Creating infoModal for ", data)
    //const data = window.rawData[key][index]

    // Modal-Header
    document.querySelector('#infoModalLabel').innerHTML = data.username + " stock information"

    // Modal-Body
    let alreadyShowed = ['username', 'pp_history'] //'username', 'pp', 'rank', 'price', 'id'
    let modalBody = ''


    if (data['username']) {
        modalBody += '<div class="card bg-darker text-white my-2">' +
            '<div class="card-header">' +
            '<strong class="me-auto">Username</strong>' +
            '</div>' +
            '<div class="card-body p-0">' +
            '<div class="table-responsive">' +
            '<table class="table table-dark mb-0">' +
            '<thead><tr>'
        modalBody += '</tr></thead>' +
            '<tbody><tr>'
        modalBody += '<td>' + render(data['username'].toString()) + '</td>'
        modalBody += '</tr></tbody>' +
            '</table></div>' +
            '</div></div>'
    }


    Object.keys(data).forEach(key => {
        if (alreadyShowed.includes(key)) {
            return
        }
        console.log(data)
        modalBody += '<div class="row my-2">' +
            '<div class="col">' + propertyName(key) + '</div>' +
            '<div class="col">' + render(data[key].toString()) + '</div>' +
            '</div>'
    })

    document.querySelector('#infoModal .modal-body').innerHTML = modalBody

    // launch modal
    new bootstrap.Modal(document.getElementById('infoModal')).show()
}