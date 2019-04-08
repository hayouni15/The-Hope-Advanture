$(document).ready(()=>{
const params=new URL(document.location)
const title=params.searchParams.get('gallery')

     fetch(`/getPictures/${title}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json'
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer", // no-referrer, *client
        // body: file // body data type must match "Content-Type" header
    }).then((res) => {
        console.log(res)
        return res.json()
    }).then((data)=>{
        data.forEach((element)=>{
            console.log(element)

                var OnePicture = picture
                const html = Mustache.render(OnePicture, {
                    Picture_name:element.Picture_name
                })
                document.querySelector('.gallery-item').insertAdjacentHTML('afterbegin',html)
        })

    })
   // alert('sd')
    const urlParams = new URLSearchParams(window.location.search);
    const galleryTitle = urlParams.get('gallery')
 //   alert(galleryTitle)
    const gallery={
        galleryTitle:galleryTitle
    }
    console.log(gallery)
     fetch('/getSingleGallery', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(gallery), // body data type must match "Content-Type" header
    }).then((res) => {
        console.log(res)
        return res.json()
    })
    .then((data) => {
        console.log(data)
        document.querySelector('.generic-blockquote').innerHTML=data[0].About_Gallery
        document.querySelector('#date').insertAdjacentHTML("afterbegin",data[0].createdAt.split('T')[0])
     
    })

    $('.img-gal').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
})