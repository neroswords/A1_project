const userId = document.getElementById("userID")

const body = document.getElementById("body")
async function main() {
    liff.ready.then(()=>{
        if(liff.getOS() === "android"){
            body.style.backgroundColor = "#888888"
        }
        if (liff.isInClient()){
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