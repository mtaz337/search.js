const FloatingMenuComponent = {
    isLoading: true,
    leftNav: [
        {
            countryCode: 'usa',
            link: 'USA',
            img: '../image/store/usa.png'
        },
        {
            countryCode: 'uk',
            link: 'UK',
            img: '../image/store/uk.png'
        },
        {
            countryCode: 'can',
            link: 'CAN',
            img: '../image/store/canada.png'
        },
        {
            countryCode: 'uae',
            link: 'UAE',
            img: '../image/store/dubai.png'
        }
    ],
    rightNav: [
        {
            link: 'Price Calculator',
            disabled: true,
            img: '../image/store/usa/price_.webp'
        },
        {
            link: 'Check Pricing',
            disabled: true,
            img: '../image/store/usa/check2.png'
        },
        {
            link: 'Demanding Brands',
            disabled: true,
            img: '../image/store/usa/brands_1.jpg'
        },
        // {
        //     link: 'LiveShopr',
        //     disabled: true,
        //     img: '../image/store/liveShoper.png'
        // }
    ],

    init() {
        let self = this
        setTimeout(function () {
            self.isLoading = false
        }, 1000)
    },

    countryCodeFromLocation() {
        let queryString = window.location.search
        if (!queryString) return 'usa'

        let urlParams = new URLSearchParams(queryString)
        let countryCode = urlParams.get("countryCode")
        return countryCode
    },

    gotoStore(countryCode) {
        if (countryCode === 'usa') {
            window.location = "/"
            return
        }

        window.location = "/stores/?countryCode=" + countryCode
    }
}
