const userId = document.getElementById("userID")

const body = document.getElementById("body")
async function main(url) {
    liff.ready.then(()=>{
        if(liff.getOS() === "android" || liff.getOS() === "web"){
            body.style.backgroundColor = "#888888"
        }
        if (!liff.isLoggedIn()) {
            liff.login({ redirectUri: url });
        }
        else if (liff.isLoggedIn()){
            getProfile()
        }
    })

    await liff.init({liffId:"1655652942-zNpjoxYV"});
}

async function getProfile(){
    const profile = await liff.getProfile();
    userId.value = profile.userId
}

// main();