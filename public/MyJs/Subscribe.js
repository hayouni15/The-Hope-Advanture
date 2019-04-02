$(document).ready(() => {
    //const $addPost = document.querySelector('#addPost')
    const $follow = document.querySelector('#followme')
    // Get the modal
    var modal = document.getElementById('subscribeModal');
    var span = document.getElementsByClassName("close")[0];


    $follow.addEventListener('click', () => {
        modal.style.display = "block";
    })

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    const $subbtn = document.querySelector('#subscribe')
    $subbtn.addEventListener('click', () => {
        const name = document.querySelector('#sub-name').value
        const email = document.querySelector('#sub-email').value

        console.log(name, email)
        fetch('/addSubscriber', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify({
                    name,
                    email
                }), // body data type must match "Content-Type" header
            }).then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.errors) {
                    const alert=document.querySelector('#alert')
                    alert.innerHTML=data.message
                    const confirm=document.querySelector('#confirm')
                    confirm.innerHTML=''
                    console.log(data)
                }
                else{
                    
                    const alert=document.querySelector('#alert')
                    alert.innerHTML=''
                    const confirm=document.querySelector('#confirm')
                    confirm.innerHTML='You are successfully subscriber to Angela '
                    setTimeout(()=>{
                        modal.style.display = "none";
                        confirm.innerHTML=''
                    },1000)
                    console.log(data)
                }
            })
    })






})