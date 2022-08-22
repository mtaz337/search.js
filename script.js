$(document).ready(function () {

    // Globally uasble variables in this script
    /*let host = $(location).attr('host');
    console.log(host);
    var lambdaReqURL;
    if (host == "airbringr.local") {
        lambdaReqURL = "http://localhost:3000";
    } else {
        lambdaReqURL = "https://hr2pgex5o7.execute-api.ap-southeast-1.amazonaws.com/prod/scrape";
    }*/

    // const createReqUrl = "https://airbringr.com/teleport.php" // Live Server
    // const createReqUrl = "http://0.0.0.0:3333/orders/create" // Test Server
    const createReqUrl = document.location.origin + "/requests/place";

    // ajax URLS
    const loginPage = document.location.origin + "/login";
    const ajaxLoginURL = document.location.origin + "/helper/login";
    const ajaxRegisterURL = document.location.origin + "/helper/register";
    const ajaxLoginCheckURL = document.location.origin + "/helper/logincheck";
    const orderBundlePlaceURL = document.location.origin + "/orders/place";

    const addItemToCartURL = document.location.origin + "/item/add-to-cart/";
    const addItemToFavoriteURL = document.location.origin + "/item/add-to-favorite/";
    const removeItemFromFavoriteURL = document.location.origin + "/item/remove-from-favorite/";
    const checkoutURL = document.location.origin + "/checkout";
    const cartURL = document.location.origin + "/requests/approved";
    const cartQtyAdd = document.location.origin + "/cart/updateqty/add/";
    const cartQtyRemove = document.location.origin + "/cart/updateqty/remove/";
    const cartItemCount = document.location.origin + "/cart/itemtotal";

    const searchURL = document.location.origin + "/search/";
    const couponValidationURL = document.location.origin + "/coupon/validate";


    // New Scraper API URL's
    const addURLToQueue = document.location.origin + "/api" + "/request-queue/add";
    const getURLFromQueue = document.location.origin + "/request-queue/";

    /*************************** START ***************************
     //  Setting UP product data variable to use in the order place function
     **************************************************************/
    var scrapeProductData;
    var nullProductData = {
        productURL: 0,
        title: 0,
        main_price_usd: 0,
        est_checkout_price_usd: 0,
        seller_takes_bdt: 0,
        airbringr_service_fee_bdt: 0,
        weight_kg: 0,
        length_inch: 0,
        width_inch: 0,
        height_inch: 0,
        volumetric_weight_kg: 0,
        weight_fee_bdt: 0,
        extra_rrr_fee_bdt: 0,
        order_total_bdt: 0,
        product_main_img: 0,
        next: 0
    }
    if ($('#product-data-holder-span').length) {
        scrapeProductData = {
            "productURL": $('#product-data-holder-span').data("producturl"),
            "title": $('#product-data-holder-span').data("title"),
            "main_price_usd": $('#product-data-holder-span').data("main_price_usd"),
            "est_checkout_price_usd": $('#product-data-holder-span').data("est_checkout_price_usd"),
            "seller_takes_bdt": $('#product-data-holder-span').data("seller_takes_bdt"),
            "weight_kg": $('#product-data-holder-span').data("weight_kg"),
            "length_inch": $('#product-data-holder-span').data("length_inch"),
            "width_inch": $('#product-data-holder-span').data("width_inch"),
            "height_inch": $('#product-data-holder-span').data("height_inch"),
            "volumetric_weight_kg": $('#product-data-holder-span').data("volumetric_weight_kg"),
            "weight_fee_bdt": $('#product-data-holder-span').data("weight_fee_bdt"),
            "extra_rrr_fee_bdt": $('#product-data-holder-span').data("extra_rrr_fee_bdt"),
            "airbringr_service_fee_bdt": $('#product-data-holder-span').data("airbringr_service_fee_bdt"),
            "order_total_bdt": $('#product-data-holder-span').data("order_total_bdt"),
            "product_main_img": $('#product-data-holder-span').data("product_main_img"),
            "next": $('#product-data-holder-span').data("next"),
            "origin": $('#product-data-holder-span').data("origin"),
        }
    }
    var itemType = $('#item-type').data("item_type");
    var itemId = $('#item-id').data("item_id");

    /*************************** END ***************************/


    /*************************** START ***************************
     //  OwlSlider2 carousel slider for
     //  Product Catalog, Media coverage, Client appreciations and Recent orders
     **************************************************************/
    // $('.owl-carousel').owlCarousel({
    //     items:4,
    //     lazyLoad:true,
    //     loop:true,
    //     margin:10
    // });

    $(".full-width-slider").owlCarousel({
        items: 1,
        dots: true,
        autoplay: true,
        nav: true,
        margin: 0,
        autoplayTimeout: 5000,
        loop: false,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        slideBy: 'page',
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    $(".product-catalog-row").owlCarousel({
        items: 6,
        dots: false,
        autoplay: false,
        nav: true,
        margin: 10,
        autoplayTimeout: 10000,
        loop: false,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        slideBy: 'page',
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    });
    $(".media-coverage-slider").owlCarousel({
        items: 5,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });
    $(".clients-slider").owlCarousel({
        items: 3,
        dots: false,
        autoplay: true,
        autoplayTimeout: 20000,
        loop: true,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    $(".recent-deals-slider").owlCarousel({
        items: 3,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        loop: true,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Match Height for
     //  Recent orders Components
     **************************************************************/
    $(".deal-title").matchHeight({});
    $(".deal-image").matchHeight({});
    /*************************** END ***************************/

    /*************************** START ***************************
     //  Match Height for
     //  Curated Items See More items
     **************************************************************/
    $(".product-catalog-col").matchHeight({});
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Take actions on Submit from the
     //  Get Price form in the Homepage
     **************************************************************/
    $("#getProductDetailsForm, #getProductDetailsFormMobile ").submit(function (event) {
        event.preventDefault()
        disableGetPriceForm()
        // let searchKeyword = $("input[name=amazonurl][type=text]").val();

        let regularForm = $("input[name=amazonurl][type=text]").val()
        let mobileHomeForm = $("input[name=amazonurl][type=text].mobile-home").val()
        if (regularForm) {
            var searchKeyword = regularForm
        } else {
            var searchKeyword = mobileHomeForm
        }

        if (!validURL(searchKeyword)) {
            window.location = searchURL + searchKeyword;
        } else {
            var theProductURL = searchKeyword;
            // Tracking the homepage get price form submission
            eventTrace('Button Click', 'Get Price', 'AirBringr Homepage')
            let queueNumber = 0;
            let itearationCount = 8;

            if (isAmazonURL(theProductURL)) {
                let reqURL = lambdaReqURL
               
                $.ajax({
                    type: "POST",
                    url: reqURL,
                    data: JSON.stringify({ amazonurl: theProductURL }),
                    contentType:"application/json; charset=utf-8",
                    dataType: "json"
                }).done(function (data) {
                    redirectToProductPage(data)
                });
                /*$.post( reqURL, JSON.stringify({ amazonurl : theProductURL}) ).done(function( data ) {
                    // if(isReadyToRedirect(data)){
                    //     redirectToProductPage(data)
                    // }else{
                    //     showOrderPlaceModal()
                    //     scrapeProductData = data
                    // }
                    //redirectToProductPage(data)
                })*/

                //**********************************
                // NEW SCRAPER MODULE INTEGRATION START
                //***********************************
                // $.ajax({
                //     url: addURLToQueue,
                //     type: 'POST',
                //     data:{"url": theProductURL,},
                //     success: function (data) {
                //         if(data.status == true){
                //             queueNumber = data.data.id
                //             nullProductData.productURL = theProductURL
                //             nullProductData.title = "Amazon Item"
                //             redirectToProductPage(nullProductData)
                //             return
                //             fetchItemResponse()
                //         }
                //     },
                //     error: function (xhr, ajaxOptions, thrownError) {     
                //         nullProductData.productURL = theProductURL
                //         nullProductData.title = "Amazon Item"
                //         redirectToProductPage(nullProductData)           
                //     }
                // });

                function fetchItemResponse() {
                    if (itearationCount == 0) {
                        nullProductData.productURL = theProductURL
                        nullProductData.title = "Amazon Item"
                        redirectToProductPage(nullProductData)
                    }
                    itearationCount -= 1

                    $.ajax({
                        url: getURLFromQueue + queueNumber,
                        type: 'GET',
                        success: function (data) {
                            if (data) {
                                redirectToProductPage(data)
                            } else {
                                setTimeout(fetchItemResponse, 2000);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            nullProductData.productURL = theProductURL
                            nullProductData.title = "Amazon Item"
                            redirectToProductPage(nullProductData)
                        }
                    });
                    return 1;
                }

                //**********************************
                // NEW SCRAPER MODULE INTEGRATION END
                //***********************************


            } else {
                // nullProductData.productURL = theProductURL
                // nullProductData.title = 'Non Amazon Item'
                // scrapeProductData = nullProductData;
                // showOrderPlaceModal()

                // let regularForm = $("input[name=amazonurl][type=text]").val()
                // let mobileHomeForm = $("input[name=amazonurl][type=text].mobile-home").val()
                // if(regularForm){
                //     nullProductData.productURL = regularForm
                // }else{
                //     nullProductData.productURL = mobileHomeForm
                // }

                nullProductData.productURL = theProductURL
                nullProductData.title = "Non Amazon Item"
                redirectToProductPage(nullProductData)
            }
        }

    })

    /*************************** END ***************************/


    /*************************** START ***************************
     //  Product Details page inital button press action
     **************************************************************/
    $("#detailsPageRequestBtn").click(function (e) {
        e.preventDefault();
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')


        // TODO: STEP 1: Check if logged in or not
        // TODO: STEP 2: if logged in place item request
        // TODO: STEP 3: if NOT logged in hide product form and show login form
        // TODO: STEP 4: submit login form and login the user 
        // TODO: STEP 5: then place the order request
        // TODO: STEP 6: if pressed register hide login form and show register form
        // TODO: STEP 7: submit register form and register the user
        // TODO: STEP 8: then place the order request


        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote
                    }, scrapeProductData);
                    scrapeProductData = undefined
                }


                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                $('#requested-slot').fadeIn();

            } else if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote
                    }, scrapeProductData);
                    scrapeProductData = undefined
                }

                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                $('#requested-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });


    })

    $("#autoDetailsPageAddToCartBtn").click(function (e) {
        e.preventDefault();
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')


        // TODO: STEP 1: Check if logged in or not
        // TODO: STEP 2: if logged in place item request
        // TODO: STEP 3: if NOT logged in hide product form and show login form
        // TODO: STEP 4: submit login form and login the user 
        // TODO: STEP 5: then place the order request
        // TODO: STEP 6: if pressed register hide login form and show register form
        // TODO: STEP 7: submit register form and register the user
        // TODO: STEP 8: then place the order request


        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote,
                        "autopricing": true
                    }, scrapeProductData);
                    scrapeProductData = undefined

                    window.location.href = cartURL;

                }


                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                // $('#requested-slot').fadeIn();

            } else if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote,
                        "autopricing": true
                    }, scrapeProductData);
                    scrapeProductData = undefined

                    window.location.href = cartURL;

                }

                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                // $('#requested-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });
    })

    $("#autoDetailsPageBuyNowBtn").click(function (e) {
        e.preventDefault();
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')


        // TODO: STEP 1: Check if logged in or not
        // TODO: STEP 2: if logged in place item request
        // TODO: STEP 3: if NOT logged in hide product form and show login form
        // TODO: STEP 4: submit login form and login the user 
        // TODO: STEP 5: then place the order request
        // TODO: STEP 6: if pressed register hide login form and show register form
        // TODO: STEP 7: submit register form and register the user
        // TODO: STEP 8: then place the order request


        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote,
                        "autopricing": true
                    }, scrapeProductData);
                    scrapeProductData = undefined

                    window.location.href = checkoutURL;

                }


                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                // $('#requested-slot').fadeIn();

            } else if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                if (itemType && itemType == 'inventory') {
                    addInventoryToCart(itemId)
                } else {
                    placeProductRequest({
                        "name": "",
                        "email": "",
                        "phone": "",
                        "orderNote": itemOrderNote,
                        "autopricing": true
                    }, scrapeProductData);
                    scrapeProductData = undefined
                    window.location.href = checkoutURL;
                }

                $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                // $('#requested-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });


    })

    $("#detailsPageBuyNowBtn").click(function (e) {
        e.preventDefault();
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')


        // TODO: STEP 1: Check if logged in or not
        // TODO: STEP 2: if logged in place item request
        // TODO: STEP 3: if NOT logged in hide product form and show login form
        // TODO: STEP 4: submit login form and login the user 
        // TODO: STEP 5: then place the order request
        // TODO: STEP 6: if pressed register hide login form and show register form
        // TODO: STEP 7: submit register form and register the user
        // TODO: STEP 8: then place the order request


        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let qty = Number($(".quantity-selctor").attr("data-item-qty"));
                let itemQuantity = {
                    "qty": qty
                }

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToCartURL + itemId,
                    data: itemQuantity,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderCreated == true) {
                        // showSuccessModal()
                        location.href = checkoutURL
                    }
                });
                placeorder.fail(function (data) {
                }
                );


            } else if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()


                let qty = Number($(".quantity-selctor").attr("data-item-qty"));
                let itemQuantity = {
                    "qty": qty
                }

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToCartURL + itemId,
                    data: itemQuantity,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderCreated == true) {
                        // showSuccessModal()
                        location.href = checkoutURL
                    }
                });
                placeorder.fail(function (data) {
                }
                );

            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });


    })

    $("#detailsPageAddToCartBtn").click(function (e) {
        e.preventDefault();
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')


        // TODO: STEP 1: Check if logged in or not
        // TODO: STEP 2: if logged in place item request
        // TODO: STEP 3: if NOT logged in hide product form and show login form
        // TODO: STEP 4: submit login form and login the user 
        // TODO: STEP 5: then place the order request
        // TODO: STEP 6: if pressed register hide login form and show register form
        // TODO: STEP 7: submit register form and register the user
        // TODO: STEP 8: then place the order request


        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let qty = Number($(".quantity-selctor").attr("data-item-qty"));
                let itemQuantity = {
                    "qty": qty
                }

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToCartURL + itemId,
                    data: itemQuantity,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderCreated == true) {
                        // showSuccessModal()
                        location.href = cartURL
                    }
                });
                placeorder.fail(function (data) {
                }
                );


            } else if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()


                let qty = Number($(".quantity-selctor").attr("data-item-qty"));
                let itemQuantity = {
                    "qty": qty
                }

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToCartURL + itemId,
                    data: itemQuantity,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderCreated == true) {
                        // showSuccessModal()
                        location.href = checkoutURL
                    }
                });
                placeorder.fail(function (data) {
                }
                );

            } else {
                // TODO: STEP 3: if NOT logged in hide product form and show login form
                $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
                $('#login-slot').fadeIn();
            }
        });


    })

    $(document).on('click', '#detailsPageSaveForLaterBtn.btn-save-for-later', function (e) {
        e.preventDefault();

        $('#detailsPageSaveForLaterBtn').removeClass("btn-save-for-later");
        $('#detailsPageSaveForLaterBtn').addClass("btn-saved-for-later");

        $('#detailsPageSaveForLaterBtn i').removeClass("far");
        $('#detailsPageSaveForLaterBtn i').addClass("fas");

        $('#detailsPageSaveForLaterBtn span').text("Added to wish list");

        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderSaved == true) {
                    }
                });
                placeorder.fail(function (data) {
                }
                );


            } else if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else {
                window.location.href = loginPage;
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderSaved == true) {

                    }
                });
                placeorder.fail(function (data) {
                }
                );

            } else {
                window.location.href = loginPage;
            }
        });


    })

    $(document).on('click', '#detailsPageSaveForLaterBtn.btn-saved-for-later', function (e) {
        e.preventDefault();

        $('#detailsPageSaveForLaterBtn').removeClass("btn-saved-for-later");
        $('#detailsPageSaveForLaterBtn').addClass("btn-save-for-later");

        $('#detailsPageSaveForLaterBtn i').removeClass("fas");
        $('#detailsPageSaveForLaterBtn i').addClass("far");

        $('#detailsPageSaveForLaterBtn span').text("Add to wish list");

        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let placeorder = $.ajax({
                    method: "POST",
                    url: removeItemFromFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderSaved == true) {
                    }
                });
                placeorder.fail(function (data) {
                }
                );


            } else if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else {
                window.location.href = loginPage;
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else if (data.is_logged_in == true) {
                // TODO: STEP 2: if logged in place item request
                let itemOrderNote = $("#customer_note").val()

                let placeorder = $.ajax({
                    method: "POST",
                    url: removeItemFromFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderSaved == true) {

                    }
                });
                placeorder.fail(function (data) {
                }
                );

            } else {
                window.location.href = loginPage;
            }
        });


    })

    $("#loginRequestBtn").click(function () {
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')
        // TODO: STEP 4: submit login form and login the user 
        let f1 = $("#product-page-sign-in").validate().element("input#login-email-address")
        let f2 = $("#product-page-sign-in").validate().element("input#login-password")
        if (f1 && f2) {

            let loginData = {
                "email": $("input#login-email-address").val(),
                "password": $("input#login-password").val()
            }

            let login = $.ajax({
                method: "POST",
                url: ajaxLoginURL,
                data: loginData,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            login.done(function (data) {
                if (data.status == true) {
                    let itemOrderNote = $("#customer_note").val()

                    if (itemType && itemType == 'inventory') {
                        addInventoryToCart(itemId)
                    } else {
                        placeProductRequest({
                            "name": "",
                            "email": "",
                            "phone": "",
                            "orderNote": itemOrderNote
                        }, scrapeProductData);
                        //**********************************
                        // NEW SCRAPER MODULE SUPPORTING CODES START
                        //***********************************
                        // let next_decision = scrapeProductData.next;
                        // scrapeProductData = undefined
                        // if( next_decision != 0){
                        //     window.location.href = cartURL
                        // }
                        //**********************************
                        // NEW SCRAPER MODULE SUPPORTING CODES END
                        //***********************************
                        scrapeProductData = undefined
                    }

                    $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                    $('#requested-slot').fadeIn();
                }
                if (data.status == false) {
                    var errorMessage = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Your Email or password is incorrect.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                    $("#customMsg").html(errorMessage);
                }
            });

            login.fail(function (data) {
                alert(data.status)
            });

        }
    })

    $("#registerRequestBtn").click(function () {
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')
        // TODO: STEP 7: submit register form and register the user

        let f1 = $("#product-page-sign-up").validate().element("input#register-full-name")
        let f2 = $("#product-page-sign-up").validate().element("input#register-email-address")
        let f3 = $("#product-page-sign-up").validate().element("input#register-phone-number")
        let f4 = $("#product-page-sign-up").validate().element("input#register-password")

        if (f1 && f2 && f3 && f4) {
            let registrationData = {
                "name": $("input#register-full-name").val(),
                "email": $("input#register-email-address").val(),
                "phone": $("input#register-phone-number").val(),
                "password": $("input#register-password").val(),
                // "password_confirmation": $("#test-registration-form #test-registration-pass-conf").val(),
            }

            let registration = $.ajax({
                method: "POST",
                url: ajaxRegisterURL,
                data: registrationData,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            registration.done(function (data) {
                if (data.status == true) {
                    let itemOrderNote = $("#customer_note").val()
                    if (itemType && itemType == 'inventory') {
                        addInventoryToCart(itemId)
                    } else {
                        placeProductRequest({
                            "name": "",
                            "email": "",
                            "phone": "",
                            "orderNote": itemOrderNote
                        }, scrapeProductData);

                        //**********************************
                        // NEW SCRAPER MODULE SUPPORTING CODES START
                        //***********************************
                        // let next_decision = scrapeProductData.next;
                        // scrapeProductData = undefined
                        // if( next_decision != 0){
                        //     window.location.href = cartURL
                        // }
                        //**********************************
                        // NEW SCRAPER MODULE SUPPORTING CODES END
                        //***********************************
                        scrapeProductData = undefined

                    }
                    $('#price-breakdown-slot, #registration-slot, #login-slot').hide();
                    $('#requested-slot').fadeIn();
                }
                if (data.status == false) {
                    var errorMessage = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' + data.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                    $("#customMsgRegister").html(errorMessage);
                }
            });

            registration.fail(function (data) {
            });
        }
    })

    $("#registerFlowtBtn").click(function () {
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')

        // TODO: STEP 6: if pressed register hide login form and show register form
        $('#price-breakdown-slot, #login-slot, #requested-slot').hide();
        $('#registration-slot').fadeIn();

    })

    $("#loginFlowtBtn").click(function () {
        // Tracking the click of Request Order button in product details page
        // eventTrace('Button Click','Request Order','AirBringr Product Details Page')

        // TODO: STEP 6: if pressed register hide login form and show register form
        $('#price-breakdown-slot, #registration-slot, #requested-slot').hide();
        $('#login-slot').fadeIn();

    })

    /*************************** END ***************************/
    /*************************** START ***************************
     //  Place Order on Modals Request Product Button Click
     **************************************************************/
    $("form#prodReq-email-form").on('submit', function (e) {
        e.preventDefault();
        let customerData = collectCustomerDataFromForm()

        // Tracking the click of Request Order button in modal window
        // eventTrace('Button Click', 'Request Order', 'AirBringr Customer Details Modal')
        placeProductRequest(customerData, scrapeProductData);
        scrapeProductData = undefined
    });
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Sticky Header
     **************************************************************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > $("header.navbar.transparent").height()) {
            $('header.abr-sticky-header').css("transform", "translateY(0)");
        } else {
            $('header.abr-sticky-header').css("transform", "translateY(-200%)");
        }
    });
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Parallax Sections
     **************************************************************/
    // $('.about-block').parallax({
    //     imageSrc: '../image/about-bg.jpg'
    // });
    // $('.clients-block').parallax({
    //     imageSrc: '../image/appreciation.jpg'
    // });
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Smooth Scrolling for in page URL's
     **************************************************************/
    $('header').smoothScroll();
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Sticky Right Sidebar
     //  on Product details page
     **************************************************************/
    $(".product-info-block").stick_in_parent({
        'offset_top': 60
    });
    /*************************** END ***************************/


    // $(".order-place-guideline-video").YouTubePopUp();


    /*************************** START ***************************
     //  Product image gallery
     //  on Product details page
     **************************************************************/
    $(".product-image-gallery .image-gallery .thumb-list .thumb").on('click', function () {
        let newBG = "url(" + $(this).data("product-image") + ")";
        $(".product-image-gallery .image-gallery .thumb-list .thumb").removeClass("selected");
        $(".product-image-gallery .image-gallery .featured-image").css('background-image', newBG);
        $(this).addClass("selected");
    });

    $(".product-image-gallery .image-gallery .gallery-next").on('click', function () {

        let this_thumb = $(".product-image-gallery .image-gallery .thumb-list .thumb.selected");
        let next_thumb = $(this_thumb).next();
        if (next_thumb.length) {
            let newBG = "url(" + $(next_thumb).data("product-image") + ")";
            $(this_thumb).removeClass("selected");
            $(".product-image-gallery .image-gallery .featured-image").css('background-image', newBG);
            $(next_thumb).addClass("selected");
        }


    });


    $(".product-image-gallery .image-gallery .gallery-prev").on('click', function () {
        // let newBG = "url("+$(this).data("product-image")+")";
        // $(".product-image-gallery .image-gallery .thumb-list .thumb").removeClass("selected");
        // $(".product-image-gallery .image-gallery .featured-image").css('background-image', newBG);
        // $(this).addClass("selected");


        let this_thumb = $(".product-image-gallery .image-gallery .thumb-list .thumb.selected");
        let next_thumb = $(this_thumb).prev();
        if (next_thumb.length) {
            let newBG = "url(" + $(next_thumb).data("product-image") + ")";
            $(this_thumb).removeClass("selected");
            $(".product-image-gallery .image-gallery .featured-image").css('background-image', newBG);
            $(next_thumb).addClass("selected");
        }

    });

    /*************************** END ***************************/


    /*************************** START ***************************
     //  Product price breakdown Popover
     //  on Product details page
     **************************************************************/
    if (typeof popoverContentMarkup != 'undefined') {
        $(".product-info-block .product-price").popover({
            // 'content': " " + product_price + " " + weight_fee + " " + service_fee + " ",
            "content": popoverContentMarkup,
            "placement": "top",
            "html": true
        });
        $(".product-info-block .product-price").on("mouseleave", function () {
            $(".product-info-block .product-price").popover('hide');
        });
    }
    /*************************** END ***************************/


    /*************************** START ***************************
     //  Reset form data & block visibility while
     //  Order Place modal closes
     **************************************************************/
    $('#productRequestModal').on('hidden.bs.modal', function (e) {
        enableGetPriceForm()
        resetOrderPlaceModalFormData()
        hideSuccessModal()
    });
    /*************************** END ***************************/


    /*************************** START ***************************
     //  The following code block updates the order total in product details page
     //  according to the selected order delivery method radion button
     **************************************************************/
    $('input[name=deliveryoptions]').change(function () {
        let deliveryCharge = 0
        if (this.value == 'pickup') {
            deliveryCharge = 0
        } else if (this.value == 'inside') {
            deliveryCharge = 70
        } else if (this.value == 'outside') {
            deliveryCharge = 150
        }
        let totalPrice = parseInt($('.product-details-sub-section .product-price').data("product-price"));
        let total_price = totalPrice + deliveryCharge
        $('.product-details-sub-section .product-price').html("৳ <span>" + total_price + " + </span>");
    });

    /*************************** END ***************************/


    /*************************** START ***************************
     //  Helper Functions
     // **************************************************************/
    function disableGetPriceForm() {
        $(".form-btn-text").html('<i class="fas fa-spinner fa-spin"></i>').attr("disabled", "disabled");
        $("form#getProductDetailsForm input[type=text], form#getProductDetailsFormMobile input[type=text]").attr("readonly", "readonly");
    }

    function enableGetPriceForm() {
        $(".form-btn-text").html('Get Price').attr("disabled", false);
        $("form#getProductDetailsForm input[type=text], form#getProductDetailsFormMobile input[type=text]").attr("readonly", false);
        $("form#getProductDetailsForm input[type=text], form#getProductDetailsFormMobile input[type=text]").val("");
    }

    function showOrderPlaceModal() {
        $("#productRequestModal").modal("show");
        $("#inputFieldsDialogue").removeClass("d-none");
    }

    function resetOrderPlaceModalFormData() {
        $("#prodReq-email-form #reqName").val("")
        $("#prodReq-email-form #reqEmail").val("")
        $("#prodReq-email-form #reqPhone").val("")
        $('#customer_note').val("")
    }

    function showSuccessModal() {
        $("#inputFieldsDialogue").addClass("d-none")
        $("#productRequestModal").modal("show")
        $("#orderSuccessModal").removeClass("d-none")
    }

    function hideSuccessModal() {
        $("#orderSuccessModal").addClass("d-none")
        $("#inputFieldsDialogue").removeClass("d-none")
    }

    function isAmazonURL(productURL) {
        let URLHasAmazonSource = productURL.includes("https://www.amazon");
        if (URLHasAmazonSource) {
            return true
        } else return false
    }

    function validURL(myURL) {
        var res = myURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return false;
        else
            return true;
    }


    // function scrapeProductDataFromAmazon( amazonProductUrl ){
    //     let reqURL = lambdaReqURL

    //     var scrapedData;
    //     $.post( reqURL, JSON.stringify({ amazonurl : amazonProductUrl}) ).done(function( data ) {
    //         scrapedData = data
    //         return scrapedData
    //     })
    // }

    function collectCustomerDataFromForm() {
        return {
            "name": $("#prodReq-email-form #reqName").val(),
            "email": $("#prodReq-email-form #reqEmail").val(),
            "phone": $("#prodReq-email-form #reqPhone").val(),
            "orderNote": $('#customer_note').val(),
            "deliveryMethod": $('input[name=deliveryoptions]:checked').val()

        }
    }

    // function isReadyToRedirect(scrapedData){
    //     let scrapedProdHas_BasePrice = false;
    //     let scrapedProdHas_Weight = false;
    //     let scrapedProdHas_DimensionalWeight = false;
    //     let dimentionalWeightExceedsOriginalWeight = false;

    //     if (scrapedData.main_price_usd > 0){
    //         scrapedProdHas_BasePrice = true;
    //     }

    //     if (scrapedData.weight_kg > 0){
    //         scrapedProdHas_Weight = true;
    //     }

    //     if (scrapedData.volumetric_weight_kg > 0){
    //         scrapedProdHas_DimensionalWeight = true
    //     }

    //     if (scrapedData.volumetric_weight_kg < scrapedData.weight_kg){
    //         dimentionalWeightExceedsOriginalWeight = true;
    //     }

    //     if (scrapedProdHas_BasePrice == true && 
    //         scrapedProdHas_Weight == true && 
    //         scrapedProdHas_DimensionalWeight == true && 
    //         dimentionalWeightExceedsOriginalWeight == true){
    //         return true
    //     }else{
    //         return false
    //     }
    // }

    function redirectToProductPage(redirectionData) {
        var jsonStringData = JSON.stringify(redirectionData);
        $("#productJson").val(jsonStringData);
        $("#secondProdJsonForm").submit();
    }

    function placeProductRequest(customerData, requestData) { // type = email || facebook

        let reqURL = createReqUrl

        let cust_fullname_self = customerData.name;
        let cust_email_self = customerData.email;
        let cust_phone_self = customerData.phone;

        // TODO: In the adonis order create method needs to eliminate order_via condition check
        let type = 2; // type is for email

        let order_note = customerData.orderNote;
        let delivery_method = customerData.deliveryMethod;
        var autopricing = false;
        if ("autopricing" in customerData) {
            autopricing = true
        }

        if (requestData) {
            var dataToPass = {
                "for": "placeorder",
                "order_via": type,
                "product_url": requestData.productURL ? requestData.productURL : 0,
                "product_title": requestData.title ? requestData.title : 0,
                "product_base_price_usd": requestData.main_price_usd ? requestData.main_price_usd : 0,
                "est_checkout_price_usd": requestData.est_checkout_price_usd ? requestData.est_checkout_price_usd : 0,
                "seller_takes_bdt": requestData.seller_takes_bdt ? requestData.seller_takes_bdt : 0,
                "product_weight_kg": requestData.weight_kg ? requestData.weight_kg : 0,
                "product_length_in": requestData.length_inch ? requestData.length_inch : 0,
                "product_width_in": requestData.width_inch ? requestData.width_inch : 0,
                "product_height_in": requestData.height_inch ? requestData.height_inch : 0,
                "product_dimensional_weight_kg": requestData.volumetric_weight_kg ? requestData.volumetric_weight_kg : 0,
                "weight_fee_bdt": requestData.weight_fee_bdt ? requestData.weight_fee_bdt : 0,
                "extra_rrr_fee_bdt": requestData.extra_rrr_fee_bdt ? requestData.extra_rrr_fee_bdt : 0,
                "airbringr_service_fee_bdt": requestData.airbringr_service_fee_bdt ? requestData.airbringr_service_fee_bdt : 0,
                "order_total_bdt": requestData.order_total_bdt ? requestData.order_total_bdt : 0,
                "product_main_img": requestData.product_main_img ? requestData.product_main_img : null,

                "order_note": order_note ? order_note : 0,
                "delivery_method": delivery_method ? delivery_method : 0,
                "next": requestData.next ? requestData.next : 0,

                "autopricing": autopricing,

                "cust_phone_self": cust_phone_self ? cust_phone_self : 0,
                "cust_fullname_self": cust_fullname_self ? cust_fullname_self : 0,
                "cust_email_self": cust_email_self ? cust_email_self : 0,
                "origin": requestData.origin,
            };
        }

        let placeorder = $.ajax({
            method: "POST",
            url: reqURL,
            data: dataToPass,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });

        placeorder.done(function (data) {
            if (data.orderCreated == true) {
                // showSuccessModal()

                // Tracking the order placement status from the modal window
                // eventTrace('Form Submission', 'Place Order', 'Order Placement Success')
                return true;

            } else if (data.msg) {
                $(".alert-placeorder-warning").text(data.msg).fadeIn();

                // Tracking the order placement status from the modal window
                // eventTrace('Form Submission', 'Place Order', 'Order Placement Failure')
                return false;

            }
        });
        placeorder.fail(function (data) {
            return false;
        }
        );

    }

    function addInventoryToCart(itemId) { // type = email || facebook


        let placeorder = $.ajax({
            method: "POST",
            url: addItemToCartURL + itemId,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });

        placeorder.done(function (data) {
            if (data.orderCreated == true) {
                // showSuccessModal()
                updateHeadercartItemCount()
                showAddToCartToast()

                // Tracking the order placement status from the modal window
                // eventTrace('Form Submission', 'Place Order', 'Order Placement Success')

            } else if (data.msg) {
                $(".alert-placeorder-warning").text(data.msg).fadeIn();


            }
        });
        placeorder.fail(function (data) {
        }
        );

    }


    function eventTrace(eventCategory, eventAction, eventLabel) { // This has been declared to protect the script from failing on the browsers where tracking scripts are blocked
        if (typeof gtag === "function") {
            gtag('event', eventAction, {
                eventCategory: eventCategory,
                eventLabel: eventLabel
            });
        }
    }

    /*************************** END ***************************/


    /*************************** START ***************************

     **************************************************************/
    /*************************** END ***************************/



    // Continue to make payment from delivery selection page
    $('#delivery-continue').on('click', function (e) {
        e.preventDefault();
        let f1 = $("#checkout-page-address").validate().element("input#delivery-full-name")
        let f2 = $("#checkout-page-address").validate().element("input#delivery-phone-number")
        let f3 = $("#checkout-page-address").validate().element("select#delivery-city-name")
        let f4 = $("#checkout-page-address").validate().element("input#delivery-address")

        if (f1 && f2 && f3 && f4) {
            $('#delivery-slot').hide();
            $('#payment-selector-slot').fadeIn();
            $(".progress-bar-holder .step-delivery").addClass("done");
            $(".progress-bar-holder .step-payment").addClass("active");
            $(".progress-bar-holder .step-delivery").removeClass("active");

            eventTrace('Checkout', 'filled delivery information', 'filled delivery information')
        }
    });

    $(document).on('click', '.step-delivery.done:not(.completed)', function (e) {
        e.preventDefault();
        $('#payment-selector-slot').hide();
        $('#delivery-slot').fadeIn();
        $(".progress-bar-holder .step-delivery").addClass("active");
        $(".progress-bar-holder .step-delivery ").removeClass("done");
        $(".progress-bar-holder .step-payment ").removeClass("active");
    });

    // Switch between delivery methods
    $("input[name=delivery]").on('change', function () {
        if (this.value == 'delivery') {
            $('.pickup-components').hide();
            $('.home-delivery-components, .checkout-price-delivery').fadeIn();
            updateCheckoutTotal();
        } else if (this.value == 'pickup') {
            $('.home-delivery-components, .checkout-price-delivery').hide();
            $('.pickup-components').fadeIn();
            updateCheckoutTotal();
        }
    });

    // Switch between payment methods
    $("input[name=payment]").on('change', function () {
        $('.checkout-price-discount-amount').hide();
        //$('#bKash_button').hide();

        // var discount = 0;
        // var discountResult = 0;
        // var totalPrice = 0;
        //  $(".checkout-list .list-item-component").each(function(){
        //     discount += $(this).data("item-discount")
        // });
        if (this.value == 'bank') {
            // discountResult =discount;
            $('.bkash-payment-components, .card-payment-components, .cash-payment-components').hide();
            $('.bank-payment-components').fadeIn();
            $('.checkout-price-discount-amount').fadeIn();
            updateCheckoutTotal();
            // $('.checkout-price-discount-amount .discount-amount').html("৳"+discountResult);
        } else if (this.value == 'cash') {
            // discountResult =discount;
            $('.bkash-payment-components, .card-payment-components, .bank-payment-components').hide();
            $('.cash-payment-components').fadeIn();
            $('.checkout-price-discount-amount').fadeIn();
            updateCheckoutTotal();
            // $('.checkout-price-discount-amount .discount-amount').html("৳"+discountResult);
        } else if (this.value == 'bkash') {
            // discountResult =discount* 0.015;
            // totalPrice=totalPrice-discountResult;
            $('.bank-payment-components, .card-payment-components, .cash-payment-components').hide();
            $('.bkash-payment-components').fadeIn();
            $('.checkout-price-discount-amount').fadeIn();
            updateCheckoutTotal();
            // $('.checkout-price-discount-amount .discount-amount').html("৳"+discountResult);


        } else if (this.value == 'card') {
            // discountResult =0;
            $('.bank-payment-components, .bkash-payment-components, .cash-payment-components').hide();
            $('.card-payment-components').fadeIn();
            $('.checkout-price-discount-amount').fadeIn();
            updateCheckoutTotal();
            // $('.checkout-price-discount-amount .discount-amount').html("৳"+discountResult);

        }
    });

    // Delivery Area change
    $("select#delivery-city-name").on('change', function () {
        updateCheckoutTotal();
    });

    // bkash option on change
    $("input[name=bkash_option]:radio").on('change', function () {
        let bkash_option = $("input[name=bkash_option]:checked").val();
        if (bkash_option == '1') {
            $("#bkashqrdiv").hide();
            $("#bkashotpdiv").fadeIn();

        }
        if (bkash_option == '2') {
            $("#bkashqrdiv").fadeIn();
            $("#bkashotpdiv").hide();
        }

    });

    // Place order collecting all data from the page
    $(".place-order-btn").on('click', function (e) {
        e.preventDefault();
        let payment_type = $("input[name=payment]:checked").val();

        if (payment_type == 'cash') {
            $(".place-order-btn").addClass("disabled");
            let orderPlaceData = {};
            orderPlaceData.receiver_name = $("input#delivery-full-name").val();
            orderPlaceData.receiver_phone = $("input#delivery-phone-number").val();
            orderPlaceData.receiver_city = $("select#delivery-city-name").val();
            orderPlaceData.receiver_address = $("input#delivery-address").val();
            orderPlaceData.receiver_note = $("input#delivery-note").val();
            orderPlaceData.payment_option = $("input[name=payment]:checked").val();
            orderPlaceData.delivery_option = $("input[name=delivery]:checked").val();
            orderPlaceData.coupon = $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code');

            let items = new Array();
            $(".checkout-list .list-item-component").each(function () {
                items.push({
                    "id": $(this).data("item-id"),
                    "qty": $(this).data("item-qty"),
                });
            });
            orderPlaceData.items = JSON.stringify(items);

            let orderPlaceData2 = new FormData();
            orderPlaceData2.append('receiver_name', orderPlaceData.receiver_name);
            orderPlaceData2.append('receiver_phone', orderPlaceData.receiver_phone);
            orderPlaceData2.append('receiver_city', orderPlaceData.receiver_city);
            orderPlaceData2.append('receiver_address', orderPlaceData.receiver_address);
            orderPlaceData2.append('receiver_note', orderPlaceData.receiver_note);
            orderPlaceData2.append('payment_option', orderPlaceData.payment_option);
            orderPlaceData2.append('delivery_option', orderPlaceData.delivery_option);
            orderPlaceData2.append('bank_slip', orderPlaceData.bank_slip);
            orderPlaceData2.append('items', orderPlaceData.items);
            if (orderPlaceData.coupon) {
                orderPlaceData2.append('coupon', orderPlaceData.coupon);
            }


            let orderBundlePlace = $.ajax({
                method: "POST",
                url: orderBundlePlaceURL,
                data: orderPlaceData2,
                processData: false,
                contentType: false,
                cache: false,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            orderBundlePlace.done(function (data) {
                if (data.orderBundleCreated == true) {
                    $('#delivery-slot, #payment-selector-slot, #payment-failed-slot').hide();
                    $('#payment-success-slot').fadeIn();
                    $(".progress-bar-holder .step-delivery").addClass("done");
                    $(".progress-bar-holder .step-delivery").addClass("completed");
                    $(".progress-bar-holder .step-payment").addClass("done");
                    $(".progress-bar-holder .step-complete").addClass("active");
                    $(".progress-bar-holder .step-payment").removeClass("active");
                    $(".place-order-btn").removeClass("disabled");
                    $(".add-to-cart").hide();
                    $(".remove-from-cart").hide();
                    $(".remove-cart").hide();
                    shoppingCart.clearCart();

                    eventTrace('Payment', 'pay via bank/cash', 'pay via bank/cash')


                    // } else if(data.msg){
                    //     $(".alert-placeorder-warning").text(data.msg).fadeIn();

                    //     // Tracking the order placement status from the modal window
                    //     eventTrace('Form Submission', 'Place Order', 'Order Placement Failure')

                } else if (data.orderBundleCreated == false) {
                    if (data.reload == true) {
                        location.reload();
                    }
                    var errorMessage = '<label id="bank-slip" class="error" for="bank-slip">Failed to place order. Try again</label>';
                    $("#customerrorBankSlip").html(errorMessage);
                    $(".place-order-btn").removeClass("disabled");
                }
            });
            orderBundlePlace.fail(function (data) {
                $('#delivery-slot, #payment-selector-slot, #payment-success-slot').hide();
                $('#payment-failed-slot').fadeIn();
                $(".progress-bar-holder .step-delivery").addClass("done");
                $(".progress-bar-holder .step-payment").addClass("active");
                $(".progress-bar-holder .step-delivery").removeClass("active");
                $(".place-order-btn").removeClass("disabled");
            }
            );
        } else if (payment_type == 'bank') {
            let f1 = $("#checkout-page-payment").validate().element("input#bank-slip")

            if (f1) {
                $(".place-order-btn").addClass("disabled");
                let orderPlaceData = {};
                orderPlaceData.receiver_name = $("input#delivery-full-name").val();
                orderPlaceData.receiver_phone = $("input#delivery-phone-number").val();
                orderPlaceData.receiver_city = $("select#delivery-city-name").val();
                orderPlaceData.receiver_address = $("input#delivery-address").val();
                orderPlaceData.receiver_note = $("input#delivery-note").val();
                orderPlaceData.payment_option = $("input[name=payment]:checked").val();
                orderPlaceData.delivery_option = $("input[name=delivery]:checked").val();
                orderPlaceData.bank_slip = $("input#bank-slip")[0].files[0];
                orderPlaceData.coupon = $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code');

                // orderPlaceData.subtotal_price
                // orderPlaceData.delivery_fee
                // orderPlaceData.bank_slip_image
                let items = new Array();
                $(".checkout-list .list-item-component").each(function () {
                    items.push({
                        "id": $(this).data("item-id"),
                        "qty": $(this).data("item-qty"),
                    });
                });
                orderPlaceData.items = JSON.stringify(items);

                let orderPlaceData2 = new FormData();
                orderPlaceData2.append('receiver_name', orderPlaceData.receiver_name);
                orderPlaceData2.append('receiver_phone', orderPlaceData.receiver_phone);
                orderPlaceData2.append('receiver_city', orderPlaceData.receiver_city);
                orderPlaceData2.append('receiver_address', orderPlaceData.receiver_address);
                orderPlaceData2.append('receiver_note', orderPlaceData.receiver_note);
                orderPlaceData2.append('payment_option', orderPlaceData.payment_option);
                orderPlaceData2.append('delivery_option', orderPlaceData.delivery_option);
                orderPlaceData2.append('bank_slip', orderPlaceData.bank_slip);
                orderPlaceData2.append('items', orderPlaceData.items);
                if (orderPlaceData.coupon) {
                    orderPlaceData2.append('coupon', orderPlaceData.coupon);
                }


                let orderBundlePlace = $.ajax({
                    method: "POST",
                    url: orderBundlePlaceURL,
                    data: orderPlaceData2,
                    processData: false,
                    contentType: false,
                    cache: false,
                    enctype: 'multipart/form-data',
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                orderBundlePlace.done(function (data) {
                    if (data.orderBundleCreated == true) {
                        $('#delivery-slot, #payment-selector-slot, #payment-failed-slot').hide();
                        $('#payment-success-slot').fadeIn();
                        $(".progress-bar-holder .step-delivery").addClass("done");
                        $(".progress-bar-holder .step-delivery").addClass("completed");
                        $(".progress-bar-holder .step-payment").addClass("done");
                        $(".progress-bar-holder .step-complete").addClass("active");
                        $(".progress-bar-holder .step-payment").removeClass("active");
                        $(".place-order-btn").removeClass("disabled");
                        $(".add-to-cart").hide();
                        $(".remove-from-cart").hide();
                        $(".remove-cart").hide();
                        shoppingCart.clearCart();

                        eventTrace('Payment', 'pay via bank/cash', 'pay via bank/cash')

                        // } else if(data.msg){
                        //     $(".alert-placeorder-warning").text(data.msg).fadeIn();

                        //     // Tracking the order placement status from the modal window
                        //     eventTrace('Form Submission', 'Place Order', 'Order Placement Failure')

                    } else if (data.orderBundleCreated == false) {
                        if (data.reload == true) {
                            location.reload();
                        }
                        var errorMessage = '<label id="bank-slip" class="error" for="bank-slip">Failed to place order. Try again</label>';
                        $("#customerrorBankSlip").html(errorMessage);
                        $(".place-order-btn").removeClass("disabled");
                    }
                });
                orderBundlePlace.fail(function (data) {
                    $('#delivery-slot, #payment-selector-slot, #payment-success-slot').hide();
                    $('#payment-failed-slot').fadeIn();
                    $(".progress-bar-holder .step-delivery").addClass("done");
                    $(".progress-bar-holder .step-payment").addClass("active");
                    $(".progress-bar-holder .step-delivery").removeClass("active");
                    $(".place-order-btn").removeClass("disabled");
                }
                );
            }
        } else if (payment_type == 'bkash') {


            let bkash_option = $("input[name=bkash_option]:checked").val();
            if (bkash_option == '2') {
                var f1 = $("#checkout-page-payment").validate().element("input#bkash_trxID");
            }

            if (bkash_option) {

                $(".place-order-btn").addClass("disabled");
                let orderPlaceData = {};
                orderPlaceData.receiver_name = $("input#delivery-full-name").val();
                orderPlaceData.receiver_phone = $("input#delivery-phone-number").val();
                orderPlaceData.receiver_city = $("select#delivery-city-name").val();
                orderPlaceData.receiver_address = $("input#delivery-address").val();
                orderPlaceData.receiver_note = $("input#delivery-note").val();
                orderPlaceData.payment_option = $("input[name=payment]:checked").val();
                orderPlaceData.delivery_option = $("input[name=delivery]:checked").val();
                orderPlaceData.coupon = $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code');


                if (f1) {
                    orderPlaceData.bkash_trxID = $("input#bkash_trxID").val();
                }
                // orderPlaceData.subtotal_price
                // orderPlaceData.delivery_fee
                // orderPlaceData.bank_trxID_image
                let items = new Array();
                $(".checkout-list .list-item-component").each(function () {
                    items.push({
                        "id": $(this).data("item-id"),
                        "qty": $(this).data("item-qty")
                    });
                });
                orderPlaceData.items = JSON.stringify(items);

                let orderPlaceData2 = new FormData();
                orderPlaceData2.append('receiver_name', orderPlaceData.receiver_name);
                orderPlaceData2.append('receiver_phone', orderPlaceData.receiver_phone);
                orderPlaceData2.append('receiver_city', orderPlaceData.receiver_city);
                orderPlaceData2.append('receiver_address', orderPlaceData.receiver_address);
                orderPlaceData2.append('receiver_note', orderPlaceData.receiver_note);
                orderPlaceData2.append('payment_option', orderPlaceData.payment_option);
                orderPlaceData2.append('delivery_option', orderPlaceData.delivery_option);
                orderPlaceData2.append('bkash_trxID', orderPlaceData.bkash_trxID);
                orderPlaceData2.append('items', orderPlaceData.items);
                orderPlaceData2.append('bkash_option', bkash_option);
                if (orderPlaceData.coupon) {
                    orderPlaceData2.append('coupon', orderPlaceData.coupon);
                }


                let orderBundlePlace = $.ajax({
                    method: "POST",
                    url: orderBundlePlaceURL,
                    data: orderPlaceData2,
                    processData: false,
                    contentType: false,
                    cache: false,
                    enctype: 'multipart/form-data',
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                orderBundlePlace.done(function (data) {
                    if (data.bkash) {
                        eventTrace('Payment', 'pay via bkash api', 'pay via bkash api')
                        window.location.href = data.reloadUrl;
                    }
                    if (data.orderBundleCreated == true) {
                        $('#delivery-slot, #payment-selector-slot, #payment-failed-slot').hide();
                        $('#payment-success-slot').fadeIn();
                        $(".progress-bar-holder .step-delivery").addClass("done");
                        $(".progress-bar-holder .step-delivery").addClass("completed");
                        $(".progress-bar-holder .step-payment").addClass("done");
                        $(".progress-bar-holder .step-complete").addClass("active");
                        $(".progress-bar-holder .step-payment").removeClass("active");
                        $(".place-order-btn").removeClass("disabled");
                        $(".add-to-cart").hide();
                        $(".remove-from-cart").hide();
                        $(".remove-cart").hide();
                        shoppingCart.clearCart();
                        // } else if(data.msg){
                        //     $(".alert-placeorder-warning").text(data.msg).fadeIn();

                        eventTrace('Payment', 'pay via bkash app', 'pay via bkash app')

                    } else if (data.orderBundleCreated == false) {
                        if (data.reload == true) {
                            location.reload();
                        }
                        if (data.errorMessage) {

                            //var errorMessage= '<label id="bkash_trxID-error-custom" class="error" for="bkash_trxID">'+data.errorMessage+'</label>';
                            var errorMessage = '<div class="alert alert-warning" role="alert">' + data.errorMessage + '</div>';
                            $("#customerrortrxid").html(errorMessage);


                        } else {
                            //var errorMessage= '<label id="bkash_trxID-error" class="error" for="bkash_trxID">Failed to verify. Try again</label>';
                            var errorMessage = '<div class="alert alert-warning" role="alert">Failed to verify. Try again</div>';

                            $("#customerrortrxid").html(errorMessage);
                        }
                        $(".place-order-btn").removeClass("disabled");
                    }
                });
                orderBundlePlace.fail(function (data) {
                    $('#delivery-slot, #payment-selector-slot, #payment-success-slot').hide();
                    $('#payment-failed-slot').fadeIn();
                    $(".progress-bar-holder .step-delivery").addClass("done");
                    $(".progress-bar-holder .step-payment").addClass("active");
                    $(".progress-bar-holder .step-delivery").removeClass("active");
                    $(".place-order-btn").removeClass("disabled");

                }
                );
            }
        } else if (payment_type == 'card') {

            $(".place-order-btn").addClass("disabled");
            let orderPlaceData = {};
            orderPlaceData.receiver_name = $("input#delivery-full-name").val();
            orderPlaceData.receiver_phone = $("input#delivery-phone-number").val();
            orderPlaceData.receiver_city = $("select#delivery-city-name").val();
            orderPlaceData.receiver_address = $("input#delivery-address").val();
            orderPlaceData.receiver_note = $("input#delivery-note").val();
            orderPlaceData.payment_option = $("input[name=payment]:checked").val();
            orderPlaceData.delivery_option = $("input[name=delivery]:checked").val();
            orderPlaceData.coupon = $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code');

            let items = new Array();
            $(".checkout-list .list-item-component").each(function () {
                items.push({
                    "id": $(this).data("item-id"),
                    "qty": $(this).data("item-qty"),
                });
            });
            orderPlaceData.items = JSON.stringify(items);

            let orderPlaceData2 = new FormData();
            orderPlaceData2.append('receiver_name', orderPlaceData.receiver_name);
            orderPlaceData2.append('receiver_phone', orderPlaceData.receiver_phone);
            orderPlaceData2.append('receiver_city', orderPlaceData.receiver_city);
            orderPlaceData2.append('receiver_address', orderPlaceData.receiver_address);
            orderPlaceData2.append('receiver_note', orderPlaceData.receiver_note);
            orderPlaceData2.append('payment_option', orderPlaceData.payment_option);
            orderPlaceData2.append('delivery_option', orderPlaceData.delivery_option);
            orderPlaceData2.append('items', orderPlaceData.items);

            if (orderPlaceData.coupon) {
                orderPlaceData2.append('coupon', orderPlaceData.coupon);
            }


            let orderBundlePlace = $.ajax({
                method: "POST",
                url: orderBundlePlaceURL,
                data: orderPlaceData2,
                processData: false,
                contentType: false,
                cache: false,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            orderBundlePlace.done(function (data) {
                if (data.orderBundleCreated == true) {
                    $('#delivery-slot, #payment-selector-slot, #payment-failed-slot').hide();
                    $(".progress-bar-holder .step-delivery").addClass("completed");
                    //$('#payment-success-slot').fadeIn();
                    //$(".progress-bar-holder .step-delivery").addClass("done");
                    //$(".progress-bar-holder .step-payment").addClass("done");
                    //$(".progress-bar-holder .step-complete").addClass("active");
                    //$(".progress-bar-holder .step-payment").removeClass("active");
                    $(".place-order-btn").removeClass("disabled");
                    shoppingCart.clearCart();

                    eventTrace('Payment', 'pay via card', 'pay via card');

                    window.location.href = "/pay/" + data.OrderBundleId;


                    // } else if(data.msg){
                    //     $(".alert-placeorder-warning").text(data.msg).fadeIn();

                    //     // Tracking the order placement status from the modal window
                    //     eventTrace('Form Submission', 'Place Order', 'Order Placement Failure')

                } else if (data.orderBundleCreated == false) {
                    if (data.reload == true) {
                        location.reload();
                    }
                    //alert("Failed. Try again")
                    $(".place-order-btn").removeClass("disabled");
                }
            });
            orderBundlePlace.fail(function (data) {
                $('#delivery-slot, #payment-selector-slot, #payment-success-slot').hide();
                $('#payment-failed-slot').fadeIn();
                $(".progress-bar-holder .step-delivery").addClass("done");
                $(".progress-bar-holder .step-payment").addClass("active");
                $(".progress-bar-holder .step-delivery").removeClass("active");
                $(".place-order-btn").removeClass("disabled");

            }
            );


        }

    })

    // START - CHECKOUT FLOW CART MANAGEMENT
    function initiateCartWithExtras() {
        shoppingCart.clearCart();
        $(".checkout-list .list-item-component").each(function () {
            let id = $(this).attr("data-item-id");
            let price = Number($(this).attr("data-item-subtotal"));
            let vat = Number($(this).attr("data-item-vat"));
            let discount = Number($(this).attr("data-item-campaign-curated-discount"));
            let count = Number($(this).attr("data-item-qty"));

            shoppingCart.addItemToCart(id, price, vat, discount, count);

            console.log(discount)
        });
    }

    initiateCartWithExtras();

    // Remove Items from Checkout Shopping Cart
    $(".checkout-list .list-item-component .checkout-cart-cleaner").on('click', function (e) {
        e.preventDefault();
        var id = $(this).closest('.list-item-component').data('item-id');
        $(this).closest('.list-item-component').remove();
        shoppingCart.removeItem(id);
        updateCheckoutTotal();
        let itemCount = $(".checkout-list .list-item-component").length;
        if (!itemCount) {
            $("#delivery-continue").attr("disabled", "disabled")
        }

    });


    function updateCheckoutTotal() {
        displayCart();
        let subTotalPrice = 0;
        let discount = 0;
        let camapignCurationDiscount = 0;
        let vat = 0;
        let couponDiscount = 0;
        let discountResult = 0;
        $(".checkout-list .list-item-component").each(function () {
            subTotalPrice += (Number($(this).data("item-subtotal")) * Number($(this).data("item-qty")));
            vat += (Number($(this).data("item-vat")) * Number($(this).data("item-qty")));
            //subTotalPrice += (Number($(this).data("item-total-wotrx")) * Number($(this).data("item-qty")));

            discount += (((Number($(this).data("item-subtotal")) - Number($(this).data("item-campaign-discount"))) * 0.03) * Number($(this).data("item-qty")));
            camapignCurationDiscount += (Number($(this).data("data-item-campaign-curated-discount")) * Number($(this).data("item-qty")));

        });


        subTotalPrice = Math.ceil(subTotalPrice);
        console.log(discount, subTotalPrice)
        
        let deliveryFee = 0;
        let deliveryMode = $("input[name=delivery]:checked").val();
        if (deliveryMode == 'delivery') {
            let deliveryCity = $("select#delivery-city-name").val().toLowerCase();
            // 1tk delivery fee campaign

            if(deliveryCity == 'dhaka'){
                deliveryFee = 70;
            }else{
                deliveryFee = 150;
            }

            // if (deliveryCity == 'dhaka') {
            //     deliveryFee = 0;
            // } else {
            //     deliveryFee = 0;
            // }

        } else if (deliveryMode == 'pickup') {
            deliveryFee = 0;
        }
        let paymentMode = $("input[name=payment]:checked").val();
        if (paymentMode == 'bank') {
            discountResult = discount;
        } else if (paymentMode == 'cash') {
            discountResult = discount;
        } else if (paymentMode == 'bkash') {
            discountResult = discount * 0.5;
        } else if (paymentMode == 'card') {
            discountResult = 0;
        }
        couponDiscount = Math.ceil($(".checkout-price-summary .checkout-price-coupon-amount").data("coupon-discount"));
        let totalPrice = (subTotalPrice + deliveryFee + vat) - Math.ceil(discountResult) - Math.ceil(couponDiscount);

        $(".checkout-price-subtotal .subtotal-price").html("৳" + bn_bd(subTotalPrice));
        $(".checkout-price-vat .vat-amount").html("৳" + bn_bd(vat));
        $(".checkout-price-delivery .delivery-fee").html("৳" + bn_bd(deliveryFee));
        $(".checkout-price-discount-amount .discount-amount").html("- ৳" + bn_bd(Math.ceil(discountResult)));
        $(".checkout-price-total .total-price").data("total-price", totalPrice);
        $(".checkout-price-total .total-price").html("৳" + bn_bd(totalPrice));
        $(".checkout-price-save-amount .save-amount").html("৳" + bn_bd(Math.ceil(camapignCurationDiscount)));
        
        revalidateCoupon();
    }

    $(".add-to-cart").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        var price = Number($(this).attr("data-price"));
        var vat = Number($(this).attr("data-vat"));
        var discount = Number($(this).attr("data-item-campaign-curated-discount"));
        var count = Number($(this).attr("data-qty"));
        var item = 0;

        if (shoppingCart.addItemToCart(id, price, vat, discount, 1)) {
            displayCart();
            updateCheckoutTotal();

            let placeorder = $.ajax({
                method: "POST",
                url: cartQtyAdd + id,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            placeorder.done(function (data) {
                if (data.qtyUpdated == true) {
                    updateHeadercartItemCount()
                }
            });
        }


    });

    $(".remove-from-cart").click(function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");

        if (shoppingCart.removeCount(id)) {
            displayCart();
            updateCheckoutTotal();

            let placeorder = $.ajax({
                method: "POST",
                url: cartQtyRemove + id,
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            });

            placeorder.done(function (data) {
                if (data.qtyUpdated == true) {
                    updateHeadercartItemCount()
                    $(this).closest(".list-item-component").data("item-qty", 99)
                }
            });
        }


    });


    function displayCart() {
        var cartArray = shoppingCart.listCart();
        for (var i in cartArray) {
            $(".count" + cartArray[i].id).html(cartArray[i].count);
            // $("#checkout-price"+cartArray[i].id).html("৳"+bn_bd(cartArray[i].price * cartArray[i].count));
            $(".checkout-list .list-item-component").each(function () {
                var item = $(this).data("item-id");
                if (item == cartArray[i].id) {
                    $(this).data("item-qty", cartArray[i].count);
                    $(this).data("item-vat", cartArray[i].vat);
                    $(this).data("data-item-campaign-curated-discount", cartArray[i].discount);
                    $(this).data("item-total", cartArray[i].count * (cartArray[i].price + cartArray[i].vat));
                }
            });
        }
    }

    // END - CHECKOUT FLOW CART MANAGEMENT        


    //bn_bd currency

    function bn_bd(x) {
        var bd = x.toLocaleString('bn-BD');
        return bd.getDigitEnglishFromBangla();
    }

    //change banla number to english digits
    var bden = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
    String.prototype.getDigitEnglishFromBangla = function () {
        var retStr = this;
        for (var x in bden) {
            retStr = retStr.replace(new RegExp(x, 'g'), bden[x]);
        }
        return retStr;
    };

    let deliverySelected = $("input[name=delivery]:checked").val();
    if (deliverySelected == 'delivery') {
        updateCheckoutTotal();
    }
    //     //bkash payment web
    //     let paymentID;
    //     let createCheckoutUrl = 'http://localhost:8000/order/bkash/createpayment/';
    //     let executeCheckoutUrl = 'http://localhost:8000/order/bkash/executePayment/';
    //     function triggerBtnFn() {
    //         myVar = setTimeout(triggerBtn, 3000);
    //     }
    //     function triggerBtn(){
    //             //initBkash(amount)
    //         $('#bKash_button').trigger('click');
    //     }

    //     function initBkashFn (amount,callback) {
    //         initBkash(amount);
    //         callback();
    //      }


    // function initBkash(amount) {
    //     bKash.init({
    //     paymentMode: 'checkout', // Performs a single checkout.
    //     paymentRequest: {"amount": amount, "intent": 'sale'},

    //     createRequest: function (request) {
    //         $.ajax({
    //         url: createCheckoutUrl+amount,
    //         type: 'GET',
    //         contentType: 'application/json',
    //         success: function (data) {
    //             if (data && data.paymentID != null) {
    //             paymentID = data.paymentID;
    //             bKash.create().onSuccess(data);
    //             } 
    //             else {
    //             bKash.create().onError(); // Run clean up code
    //             //alert(data.errorMessage + " Tag should be 2 digit, Length should be 2 digit, Value should be number of character mention in Length, ex. MI041234 , supported tags are MI, MW, RF");
    //             alert("Invalid request.")
    //             }

    //         },
    //         error: function (data) {
    //             bKash.create().onError(); // Run clean up code
    //             alert(data.errorMessage);
    //         }
    //         });
    //     },
    //     executeRequestOnAuthorization: function () {
    //         $.ajax({
    //         url: executeCheckoutUrl+paymentID,
    //         type: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify({"paymentID": paymentID}),
    //         success: function (data) {

    //             if (data && data.paymentID != null) {
    //             // On success, perform your desired action
    //             alert('[SUCCESS] data : ' + JSON.stringify(data));
    //             window.location.href = "/success_page.html";

    //             } else {
    //             alert('[ERROR] data : ' + JSON.stringify(data));
    //             bKash.execute().onError();//run clean up code
    //             }

    //         },
    //         error: function () {
    //             alert('An alert has occurred during execute');
    //             bKash.execute().onError(); // Run clean up code
    //         }
    //         });
    //     },
    //     onClose: function () {
    //         alert('Are you sure?');
    //     }
    //     });

    //     $('#bKash_button').removeAttr('disabled');

    // }


    // Add this card item to cart
    $('.card-to-cart').on('click', function (e) {
        e.preventDefault()
        const itemId = $(this).data("item_id")

        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                addInventoryToCart(itemId)
            } else if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else {
                window.location.href = loginPage;
            }
        });
        logincheck.fail(function (data) {
            window.location.href = loginPage;
        });
    })


    $(document).on('click', '.product-item-slider-heart:not(.saved-for-later)', function (e) {
        e.preventDefault();
        const itemId = $(this).data("item_id")

        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {
                $('#item-heart-' + itemId + ' i').removeClass("far");
                $('#item-heart-' + itemId + ' i').addClass("fas");
                $('#item-heart-' + itemId + '.product-item-slider-heart').addClass("saved-for-later");

                // TODO: STEP 2: if logged in place item request


                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });
                placeorder.done(function (data) {
                    if (data.orderSaved == true) {

                    }
                });
                placeorder.fail(function (data) {
                }
                );


            } else if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else {
                window.location.href = loginPage;
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else if (data.is_logged_in == true) {
                $('#item-heart-' + itemId + ' i').removeClass("far");
                $('#item-heart-' + itemId + ' i').addClass("fas");
                $('#item-heart-' + itemId + '.product-item-slider-heart').addClass("saved-for-later");

                let placeorder = $.ajax({
                    method: "POST",
                    url: addItemToFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.orderSaved == true) {
                    }
                });
                placeorder.fail(function (data) {
                }
                );

            } else {
                window.location.href = loginPage;
            }
        });


    })


    $(document).on('click', '.product-item-slider-heart.saved-for-later', function (e) {
        e.preventDefault();
        const itemId = $(this).data("item_id")

        //TODO: STEP 1:  Check if logged in or not
        let logincheck = $.ajax({
            method: "POST",
            url: ajaxLoginCheckURL,
            data: '',
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        logincheck.done(function (data) {
            if (data.is_logged_in == true) {

                $('#item-heart-' + itemId + ' i').removeClass("fas");
                $('#item-heart-' + itemId + ' i').addClass("far");
                $('#item-heart-' + itemId + '.product-item-slider-heart').removeClass("saved-for-later");


                let remove_favorite_request = $.ajax({
                    method: "POST",
                    url: removeItemFromFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                remove_favorite_request.done(function (data) {

                });
                remove_favorite_request.fail(function (data) {

                }
                );


            } else if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else {
                window.location.href = loginPage;
            }
        });

        logincheck.fail(function (data) {
            if (data.is_logged_in == false) {
                window.location.href = loginPage;
            } else if (data.is_logged_in == true) {
                $('#item-heart-' + itemId + ' i').removeClass("fas");
                $('#item-heart-' + itemId + ' i').addClass("far");
                $('#item-heart-' + itemId + '.product-item-slider-heart').removeClass("saved-for-later");

                let remove_favorite_request = $.ajax({
                    method: "POST",
                    url: removeItemFromFavoriteURL + itemId,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                remove_favorite_request.done(function (data) {

                });
                remove_favorite_request.fail(function (data) {

                }
                );

            } else {
                window.location.href = loginPage;
            }
        });


    })


    $('[data-countdown]').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('%I : %M : %S'));
        });
    });


    function showAddToCartToast() {
        Toastify({
            text: "Item added to cart",
            duration: 5000,
            gravity: "top", // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #28aefc, #007bff)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toast-customizer",
            onClick: function () {
            } // Callback after click

        }).showToast();
    }


    // Update item quantity in the cart page - START
    $('.decrease-item-quantity ').on('click', function (e) {
        e.preventDefault()
        updateCartItemQuantity(this, false)
    })
    $('.increase-item-quantity').on('click', function (e) {
        e.preventDefault()
        updateCartItemQuantity(this, true)
    })


    function updateCartItemQuantity(elm, cond) {

        let parentElm = $(elm).closest(".list-item-component");
        let currentQty = Number($(parentElm).data("item-qty"))
        let currentItem = Number($(parentElm).data("item-id"))

        if (cond) {
            if (currentQty < 5) {
                currentQty += 1

                let placeorder = $.ajax({
                    method: "POST",
                    url: cartQtyAdd + currentItem,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.qtyUpdated == true) {
                        $(parentElm).data("item-qty", currentQty)
                        $(elm).closest('.input-group').find('.count-box .count').text(currentQty);
                        updateCartSubtotal()
                        updateHeadercartItemCount()
                    }
                });
                placeorder.fail(function (data) {

                }
                );

            }
        } else {
            if (currentQty > 1) {
                currentQty -= 1
                let placeorder = $.ajax({
                    method: "POST",
                    url: cartQtyRemove + currentItem,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
                });

                placeorder.done(function (data) {
                    if (data.qtyUpdated == true) {
                        $(parentElm).data("item-qty", currentQty)
                        $(elm).closest('.input-group').find('.count-box .count').text(currentQty);
                        updateCartSubtotal()
                        updateHeadercartItemCount()
                    }
                });
                placeorder.fail(function (data) {
                }
                );
            }
        }


    }

    function updateCartSubtotal() {
        let subTotalPrice = 0;
        let subTotalItems = 0;
        let discount = 0;
        $(".my-cart-list .list-item-component").each(function () {
            subTotalPrice += (Number($(this).data("item-subtotal")) * Number($(this).data("item-qty")));
            discount += (Number($(this).data("item-discount")) * Number($(this).data("item-qty")));
            subTotalItems += Number($(this).data("item-qty"));
        });

        $('.cart-item-count').text(subTotalItems);
        $('.cart-item-subtotal').html("৳" + bn_bd(subTotalPrice));
        $('.cart-item-discount').html("৳" + bn_bd(discount));
        if (subTotalItems == 0) {
            $('.no-item-row').removeClass('d-none');
            $('.right-sticky-button-card #btn-next-step').addClass('disabled')
        }
    }

    // Update item quantity in the cart page - END


    // Update item quantity in the product page - START
    $('.quantity-selctor .item-quantity-reduce').on('click', function (e) {
        e.preventDefault()
        itemQuantitySelector(this, false)

    })
    $('.quantity-selctor .item-quantity-add').on('click', function (e) {
        e.preventDefault()
        itemQuantitySelector(this, true)
    })


    function itemQuantitySelector(elm, cond) {

        let parentElm = $(elm).closest(".quantity-selctor");
        let currentQty = Number($(parentElm).attr("data-item-qty"))

        if (cond) {
            if (currentQty < 5) {
                currentQty += 1
                $(parentElm).attr("data-item-qty", currentQty)
            }
        } else {
            if (currentQty > 1) {
                currentQty -= 1
                $(parentElm).attr("data-item-qty", currentQty)
            }
        }

        $(elm).closest('.input-group').find('.count-box .count').text(currentQty);

    }

    // Update item quantity in the product page - END


    // Update cart item count in header icon - START
    function updateHeadercartItemCount() {
        let placeorder = $.ajax({
            method: "GET",
            url: cartItemCount,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });

        placeorder.done(function (data) {
            if (data.itemTotal) {
                $('.cart-count-icon').text(data.itemTotal).show();
            } else {
                $('.cart-count-icon').text(data.itemTotal).hide();
            }
        });
        placeorder.fail(function (data) {

        }
        );
    }

    updateHeadercartItemCount();
    // Update cart item count in header icon - END


    $('nav.navbar-nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).fadeIn(200);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).fadeOut(200);
    });


    // move item from My cart to wish list
    $(document).on('click', '.save-later .saveitem', function (e) {
        e.preventDefault();
        let element = $(this);
        let url = $(this).attr('href');

        $(element).closest(".list-item-component").remove();
        updateCartSubtotal()


        let add_to_wishlist = $.ajax({
            method: "POST",
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        add_to_wishlist.done(function (data) {
            location.reload();
            updateHeadercartItemCount()
        });
        add_to_wishlist.fail(function (data) {
        });

    });


    // move item from wish list to my cart
    $(document).on('click', '.info-holder .restoreitem', function (e) {
        e.preventDefault();
        var element = $(this);
        var url = $(this).attr('href');

        $(element).closest(".list-item-component").remove();
        if ($(".my-wish-list .list-item-component").length == 0) {
            $('.no-item-row').removeClass('d-none');
        }

        let move_to_my_cart = $.ajax({
            method: "POST",
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        move_to_my_cart.done(function (data) {
            updateHeadercartItemCount()
        });
        move_to_my_cart.fail(function (data) {
        });

    });


    // SHOW HIDE COUPON FORM
    $(document).on('click', '.checkout-price-summary p.coupon-cta a', function (e) {
        e.preventDefault();

        $(".checkout-price-summary .coupon-form").removeClass('d-none');
    });

    // TAKE ACTION WHILE CLICK APPLY FOR COUPON CODE
    $(document).on('click', '.checkout-price-summary .coupon-form .coupon-button', function (e) {
        e.preventDefault();
        let couponCode = $(".checkout-price-summary .coupon-form .coupon-code").val().toUpperCase();
        $(".checkout-price-summary .coupon-form .coupon-code").attr("disabled", "disabled");
        let cartTotal = Number($(".checkout-price-total .total-price").data("total-price"));

        // VALIDATE IF THE COUPON CODE IS VALID && GET THE DISCOUNT AMOUNT FROM API
        let data = { "code": couponCode, "total": cartTotal };
        validateCouponWithServer(data, false);


        // CLEAN UP THE FORM
        $(".checkout-price-summary .coupon-form .coupon-code").removeAttr("disabled");
        $(".checkout-price-summary .coupon-form .coupon-code").val("");
        $(".checkout-price-summary .coupon-form").addClass('d-none');

        // SHOW THE DISCOUNT VALUE IN CHECKOUT TABLE

    });

    // Validate already USED COUPON ON CART UPDATE

    function validateCouponWithServer(data, revalidation = true) {
        let validateCoupon = $.ajax({
            url: couponValidationURL,
            type: 'POST',
            data: data,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        validateCoupon.done(function (data) {
            data = JSON.parse(data)
            if (data.valid == true) {
                viewCouponDiscountInTable(data);
            }

            if (data.error == true) {
                cleanCouponDiscountInTable();
                alert(data.message);
            }
            if (!revalidation) {
                updateCheckoutTotal();
                if (data.valid == true && data.message) {
                    alert(data.message)
                }
            }
        });
        validateCoupon.fail(function (data) {
            alert("Error processing the coupon. Please try again.");
        });

    }

    function viewCouponDiscountInTable(data) {
        $(".checkout-price-summary .checkout-price-coupon-amount .coupon-amount").html("- ৳" + bn_bd(Math.ceil(data.discount)));
        $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code', data.coupon);
        $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-discount', data.discount);
        $(".checkout-price-summary .checkout-price-coupon-amount").show();
    }

    function cleanCouponDiscountInTable() {
        $(".checkout-price-summary .checkout-price-coupon-amount .coupon-amount").html("৳0");
        $(".checkout-price-summary .checkout-price-coupon-amount").hide();
        $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code', "");
        $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-discount', 0);
        updateCheckoutTotal();
    }

    function revalidateCoupon() {
        let couponCode = $(".checkout-price-summary .checkout-price-coupon-amount").data('coupon-code');
        if (couponCode) {
            let cartTotal = Number($(".checkout-price-total .total-price").data("total-price"));
            let data = { "code": couponCode, "total": cartTotal };
            validateCouponWithServer(data);
        }
    }


    // CUSTOM ANALYTICS EVENT TRACKING - START
    $('.btn-social-facebook-sign-in').on('click', function (e) {
        eventTrace('Login', 'login with facebook', 'login with facebook')
    })
    $('.btn-email-sign-in').on('click', function (e) {
        eventTrace('Login', 'login with email', 'login with email')
    })

    // CUSTOM ANALYTICS EVENT TRACKING - END


});
