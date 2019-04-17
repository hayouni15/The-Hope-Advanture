

$(document).ready(async () => {
    var pics = []
    RenderImage(pics, startSlider)


    await fetch('/getGalleryList', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json'
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer", // no-referrer, *client
        // body: file // body data type must match "Content-Type" header
    }).then((res) => {
        // console.log(res)
        return res.json()
    })
        .then((data) => {
            // console.log(data)
            var counter = 0
            data.forEach(element => {
                // console.log(element)
                counter++
                const $gallerylistContainer = document.querySelector('#appendafter')
                var gallerylistTemplate = gallerylist
                const html = Mustache.render(gallerylistTemplate, {
                    Gallery_Title: element.Gallery_Title,
                    About_Gallery: element.About_Gallery,
                    Pictures_number: element.Pictures_number,
                    Gallery_place: element.Gallery_place,
                    colornumber: counter % 8,
                    barwidth: element.Pictures_number * 100 / 30
                })
                $gallerylistContainer.insertAdjacentHTML('afterend', html)
            });
        })



    // open gallery button
    const $opengallery = document.querySelector('.opengallery')
    $('div.opengallery').click(function () {
        //  alert($(this).attr("name"));
        window.open(`/singlelibrary?gallery=${$(this).attr("name")}`, '_blank');
    })

    setTimeout(() => {
        // console.log(pics[0])
        var matches = [];


        for (var i = 0; i < pics.length; i++) {
            matches.push({ src: pics[i] });
        }
        $('.single-gallery-image').magnificPopup({

            items:
                matches
            , gallery: {
                enabled: true
            },
            type: 'image' // this is default type
        });
    }, 1000)

})

const startSlider = function () {
    console.log('3')

    if ($('.testi-slider').length) {
        $('.testi-slider').owlCarousel({
            loop: true,
            margin: 30,
            items: 1,
            nav: false,
            autoplay: 2500,
            smartSpeed: 1500,
            dots: true,
            responsiveClass: true,
            thumbs: true,
            thumbsPrerendered: true,
            navText: ["<i class='lnr lnr-arrow-left'></i>", "<i class='lnr lnr-arrow-right'></i>"]
        });
    }
}

const RenderImage = async function (pics, callback) {

    const res = await fetch('/getPictures/first', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json'
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer", // no-referrer, *client
        // body: file // body data type must match "Content-Type" header
    })
    console.log('1')

    console.log(res)

    await res.json().then((data) => {
        data.forEach(async (element) => {
            console.log(element)
            const res = await fetch('/getFlickerimages', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify({ picture: element.Picture_name }), // body data type must match "Content-Type" header
            })
            await res.json().then((data) => {
                const picURL = `https://live.staticflickr.com/${data.photo[0].server}/${data.photo[0].id}_${data.photo[0].secret}.${data.photo[0].title.split('.')[1]}`
                var OnePicture = picslide
                console.log(picURL)
                const html = Mustache.render(OnePicture, {
                    Gallery_place: element.Gallery_place,
                    Picture_name: picURL,
                    Gallery_Title: element.Gallery_Title
                })
                const html2 = Mustache.render(pagination, {})
                document.querySelector('.here').insertAdjacentHTML('afterbegin', html)
                document.querySelector('.pagination').insertAdjacentHTML('afterbegin', html2)
                pics.push(picURL)
            })
        })

    })
    console.log('2')

    setTimeout(() => {
        document.querySelector('#loader').setAttribute('style','display:none')
        callback()
    }, 2000)


}
