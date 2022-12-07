const httpClient = axios.create({ baseURL: apiBaseUrl });

const StoresComponent = {
  isLoading: true,
  selectedLink: null,
  storeTitle: "",
  query: {
    question: "",
    answer: "",
  },
  store: {
    id: null,
    logo: "",
    title: "",
    steps: [],
    link: "",
  },
  search_placeholder: {
    placeholder: "",
  },
  countryName: {
    name: "",
  },
  countryNames: {
    uk: { name: "UK" },
    usa: { name: "USA" },
    can: { name: "CAN" },
    uae: { name: "UAE" },
  },
  search_placeholders: {
    uk: {
      placeholder: "Paste an item link from any UK store here",
    },
    usa: {
      placeholder: "Paste an item link from any USA store here",
    },
    can: {
      placeholder: "Paste an item link from any Canada store here",
    },
    uae: {
      placeholder: "Paste an item link from any Canada store here",
    },
  },

  queries: {
    uk: [
      {
        question: "Is it cheaper to buy good quality products from the UK?",
        answer:
          "Yes, some products are cheaper to buy from the UK. Products that are heavier or bigger in size are actually cheaper to buy from the UK. For eg. shoes, clothes, books, supplements, beauty products etc. If you want to know the exact price, please paste the link of the product in our search bar.",
      },
      {
        question: "What is the pound(£) conversion rate for UK products?",
        answer:
          "We take the standard 135tk/£ and a small carrier charge is added on that depending on the weight of the product. You’ll get to see the total cost before making the payment.",
      },
      {
        question:
          "Do I have to pay any additional charge (eg. customs fee, weight charge) after the product arrives?",
        answer:
          "No, you don’t have to pay anything extra after your initial payment. We’ll calculate all the charges (including customs fee and weight charge) beforehand and show you the total in checkout.",
      },
      {
        question: "How long does it take to deliver?",
        answer: "Usually within 30 days.",
      },
      {
        question: "Do you have warranty/return service for UK stores?",
        answer:
          "We don’t have warranty/return service for UK stores yet, but we do hope to start soon. In the meantime, we’ll help you get products from good sellers so that you get high quality products.",
      },
      {
        question: "How to find and order items?",
        answer:
          "It’s very easy, you can find the product link from any UK website, paste it on our search bar and we’ll let you know the price within few mins(during business hours). After that you can take the item to checkout and pay with any of the payment options you like. And your order is placed!",
      },
    ],
    can: [
      {
        question: "Is it cheaper to buy good quality products from the canada?",
        answer:
          "Yes, some products are cheaper to buy from the canada. Products that are heavier or bigger in size are actually cheaper to buy from the canada. For eg. shoes, clothes, books, supplements, beauty products etc. If you want to know the exact price, please paste the link of the product in our search bar.",
      },
      {
        question: "What is the CAD($) conversion rate for canada products?",
        answer:
          "We take the standard 86tk/$ and a small carrier charge is added on that depending on the weight of the product. You’ll get to see the total cost before making the payment.",
      },
      {
        question:
          "Do I have to pay any additional charge (eg. customs fee, weight charge) after the product arrives?",
        answer:
          "No, you don’t have to pay anything extra after your initial payment. We’ll calculate all the charges (including customs fee and weight charge) beforehand and show you the total in checkout.",
      },
      {
        question: "How long does it take to deliver?",
        answer: "Usually between 30-35 days.",
      },
      {
        question: "Do you have warranty/return service for canada stores?",
        answer:
          "We don’t have warranty/return service for canada stores yet, but we do hope to start soon. In the meantime, we’ll help you get products from good sellers so that you get high quality products.",
      },
      {
        question: "How to find and order items?",
        answer:
          "It’s very easy, you can find the product link from any canada website, paste it on our search bar and we’ll let you know the price within few mins(during business hours). After that you can take the item to checkout and pay with any of the payment options you like. And your order is placed!",
      },
    ],
    uae: [
      {
        question: "Is it cheaper to buy good quality products from the canada?",
        answer:
          "Yes, some products are cheaper to buy from the canada. Products that are heavier or bigger in size are actually cheaper to buy from the canada. For eg. shoes, clothes, books, supplements, beauty products etc. If you want to know the exact price, please paste the link of the product in our search bar.",
      },
      {
        question: "What is the pound(£) conversion rate for canada products?",
        answer:
          "We take the standard 120tk/£ and a small carrier charge is added on that depending on the weight of the product. You’ll get to see the total cost before making the payment.",
      },
      {
        question:
          "Do I have to pay any additional charge (eg. customs fee, weight charge) after the product arrives?",
        answer:
          "No, you don’t have to pay anything extra after your initial payment. We’ll calculate all the charges (including customs fee and weight charge) beforehand and show you the total in checkout.",
      },
      {
        question: "How long does it take to deliver?",
        answer: "Usually between 12-18 days.",
      },
      {
        question: "Do you have warranty/return service for canada stores?",
        answer:
          "We don’t have warranty/return service for canada stores yet, but we do hope to start soon. In the meantime, we’ll help you get products from good sellers so that you get high quality products.",
      },
      {
        question: "How to find and order items?",
        answer:
          "It’s very easy, you can find the product link from any canada website, paste it on our search bar and we’ll let you know the price within few hours. After that you can take the item to checkout and pay with any of the payment options you like. And your order is placed!",
      },
    ],
  },

  stores: {
    usa: [
      {
        id: 1,
        title: "Amazon",
        filename: "amazon",
        logo: "image/store/usa/amazon.png",
        link: "https://www.amazon.com/",
      },
      {
        id: 2,
        title: "Walmart",
        filename: "walmart",
        logo: "image/store/usa/walmart.png",
        link: "https://www.walmart.com/",
      },
      {
        id: 3,
        title: "BestBuy",
        filename: "best-buy",
        logo: "image/store/usa/best-buy.png",
        link: "https://www.bestbuy.com/?intl=nosplash",
      },
      {
        id: 4,
        title: "Nike US",
        filename: "nike",
        logo: "image/store/usa/nike.png",
        link: "https://www.nike.com/",
      },
      {
        id: 5,
        title: "Target",
        filename: "target",
        logo: "image/store/usa/target.png",
        link: "https://www.target.com/",
      },
      {
        id: 1,
        title: "Ebay US",
        filename: "ebay",
        logo: "image/store/usa/ebay.png",
        link: "https://www.ebay.com/",
      },
      {
        id: 6,
        title: "Apple",
        filename: "apple",
        logo: "image/store/usa/apple.png",
        link: "https://www.apple.com/",
      },
      {
        id: 7,
        title: "Fossil",
        filename: "fossil",
        logo: "image/store/usa/fossil.png",
        link: "https://www.fossil.com/en-us/",
      },
      {
        id: 8,
        title: "Adidas US",
        filename: "adidas",
        logo: "image/store/usa/adidas.png",
        link: "https://www.adidas.com/us",
      },
      {
        id: 9,
        title: "michael kors",
        filename: "kros",
        logo: "image/store/usa/kros.png",
        link: "https://www.michaelkors.com",
      },
      {
        id: 10,
        title: "Victoria's Secret",
        filename: "Victoria-Secret-Logo",
        logo: "image/store/usa/Victoria-Secret-Logo.png",
        link: "https://www.victoriassecret.com/",
      },
      {
        id: 11,
        title: "Sephora USA",
        filename: "sephora",
        logo: "image/store/usa/sephora.png",
        link: " https://www.sephora.com/",
      },
      {
        id: 12,
        title: "H&M USA",
        filename: "h&m",
        logo: "image/store/usa/h&m.png",
        link: "https://www2.hm.com/en_us/productpage.0993000001.html",
      },

      {
        id: 13,
        title: "Jomashop",
        filename: "jomashop",
        logo: "image/store/usa/jomashop.png",
        link: "https://www.jomashop.com/",
      },
      {
        id: 14,
        title: "B&H Photo Video",
        filename: "bnh",
        logo: "image/store/usa/bnh.png",
        link: "https://www.bhphotovideo.com/",
      },

      {
        id: 15,
        title: "Macy's",
        filename: "macys",
        logo: "image/store/usa/macys-1.png",
        link: "https://www.macys.com/",
      },
      {
        id: 16,
        title: "Under Armour",
        filename: "under",
        logo: "image/store/usa/under.png",
        link: "https://www.underarmour.com/",
      },
      {
        id: 17,
        title: "New Balance",
        filename: "newbalance",
        logo: "image/store/usa/newbalance.png",
        link: "https://www.newbalance.com",
      },
      {
        id: 18,
        title: "MAC",
        filename: "mac",
        logo: "image/store/usa/mac-1.png",
        link: "https://www.maccosmetics.com",
      },

      {
        id: 19,
        title: "Google Store USA",
        filename: "google-play",
        logo: "image/store/usa/google-play.png",
        link: "https://store.google.com/us/?hl=en-US&regionRedirect=true",
      },

      {
        id: 20,
        title: "Puma",
        filename: "puma",
        logo: "image/store/usa/puma.png",
        link: "https://us.puma.com",
      },
      {
        id: 21,
        title: "HudaBeauty",
        filename: "HudaBeauty",
        logo: "image/store/usa/huda-beauty.png",
        link: "https://hudabeauty.com/",
      },
      {
        id: 22,
        title: "RayBan",
        filename: "RayBan",
        logo: "image/store/usa/ray-ban.png",
        link: "https://www.ray-ban.com/",
      },
      {
        id: 1,
        title: "Reebok",
        filename: "Reebok",
        logo: "image/store/usa/reebok.png",
        link: "https://www.reebok.com/",
      },

      //,
      // {
      //     id: 1,
      //     title: "Levi's USA",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://www.levi.com/US/en_US/"
      // },
      // {
      //     id: 1,
      //     title: "JBL USA",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://www.jbl.com/"
      // },

      // {
      //     id: 1,
      //     title: "Colourpop",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://colourpop.com/"
      // },
      // {
      //     id: 1,
      //     title: "Bose USA",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://www.bose.com/en_us/index.html"
      // },
      // {
      //     id: 1,
      //     title: "Rayban USA",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://www.ray-ban.com/international"
      // },
      // {
      //     id: 1,
      //     title: "Michael Kors USA",
      //     logo: "image/store/usa/amazon.png",
      //     link: "https://www.michaelkors.com/"
      // }
    ],
    uk: [
      {
        id: 1,
        logo: "image/store/uk/amazon.png",
        title: "Amazon UK",
        link: "https://www.amazon.co.uk/",
      },
      {
        id: 1,
        logo: "image/store/uk/apple.png",
        title: "Apple UK",
        link: "https://www.apple.com/uk/",
      },
      {
        id: 1,
        logo: "image/store/uk/asos.png",
        title: "Asos UK",
        link: "https://www.asos.com/?r=1",
      },
      {
        id: 1,
        logo: "image/store/uk/prodirect.png",
        title: "Pro Direct Soccer UK",
        link: "https://www.prodirectsoccer.com/",
      },
      {
        id: 1,
        logo: "image/store/uk/reebok.png",
        title: "Reebok UK",
        link: " https://www.reebok.co.uk/",
      },
      {
        id: 1,
        logo: "image/store/uk/adidas.png",
        title: "Adidas UK",
        link: "https://www.adidas.co.uk/",
      },
      {
        id: 1,
        logo: "image/store/uk/michaelkors.png",
        title: "Michael Kors UK",
        link: "https://www.michaelkors.co.uk/",
      },
      {
        id: 1,
        logo: "image/store/uk/currys-pc.png",
        title: "Currys PC World",
        link: "https://www.currys.co.uk/gbuk/index.html",
      },
      {
        id: 1,
        logo: "image/store/uk/boohoo.png",
        title: "Boohoo",
        link: "https://www.boohoo.com/",
      },
      {
        id: 1,
        logo: "image/store/uk/nasty-gal.png",
        title: "Nasty gal UK",
        link: "https://www.nastygal.com/gb/",
      },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Nike UK",
      //     link: "https://www.nike.com/gb/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Boots UK",
      //     link: "https://www.boots.com/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "John Lewis",
      //     link: "https://www.johnlewis.com/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Mark & Spencer",
      //     link: "https://www.marksandspencer.com/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Next",
      //     link: "https://www.next.co.uk/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Fatface",
      //     link: "https://www.fatface.com/en"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Levi's UK",
      //     link: "https://www.levi.com/GB/en_GB/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "Tommy HillFiger UK ",
      //     link: "https://uk.tommy.com/"
      // },
      // {
      //     id: 1,
      //     logo: "image/store/uk/",
      //     title: "RalpLauren UK",
      //     link: "https://www.ralphlauren.co.uk/"
      // }
    ],
    can: [
      {
        id: 1,
        title: "Amazon",
        filename: "amazon",
        logo: "image/store/usa/amazon.png",
        link: "https://www.amazon.ca/",
      },
      {
        id: 2,
        title: "Walmart",
        filename: "walmart",
        logo: "image/store/usa/walmart.png",
        link: "https://www.walmart.ca/en",
      },
      {
        id: 3,
        title: "BestBuy",
        filename: "best-buy",
        logo: "image/store/usa/best-buy.png",
        link: "https://www.bestbuy.ca/en-ca",
      },
      {
        id: 4,
        title: "Nike US",
        filename: "nike",
        logo: "image/store/usa/nike.png",
        link: "https://www.nike.com/ca/",
      },
      {
        id: 5,
        title: "Bath & Body Works",
        filename: "Bath & Body Works",
        logo: "image/store/usa/bathand.png",
        link: "https://www.bathandbodyworks.com/canada/canada-en.html",
      },
      {
        id: 1,
        title: "Ebay US",
        filename: "ebay",
        logo: "image/store/usa/ebay.png",
        link: "https://www.ebay.ca/",
      },
      {
        id: 6,
        title: "Apple",
        filename: "apple",
        logo: "image/store/usa/apple.png",
        link: "https://www.apple.com/ca/",
      },
      {
        id: 7,
        title: "Fossil",
        filename: "fossil",
        logo: "image/store/usa/fossil.png",
        link: "https://www.fossil.com/en-ca/",
      },
      {
        id: 8,
        title: "Adidas US",
        filename: "adidas",
        logo: "image/store/usa/adidas.png",
        link: "https://www.adidas.ca/en/",
      },
      {
        id: 9,
        title: "michael kors",
        filename: "kros",
        logo: "image/store/usa/kros.png",
        link: "https://www.michaelkors.ca/",
      },
      {
        id: 10,
        title: "Victoria's Secret",
        filename: "Victoria-Secret-Logo",
        logo: "image/store/usa/Victoria-Secret-Logo.png",
        link: "https://www.victoriassecret.com/ca/",
      },
      {
        id: 11,
        title: "Sephora USA",
        filename: "sephora",
        logo: "image/store/usa/sephora.png",
        link: "https://www.sephora.com/ca/en/",
      },
      {
        id: 12,
        title: "H&M USA",
        filename: "h&m",
        logo: "image/store/usa/h&m.png",
        link: "https://www2.hm.com/en_ca/index.html",
      },

      {
        id: 13,
        title: "Guess",
        filename: "guess",
        logo: "image/store/usa/guess.png",
        link: "https://www.guess.ca/en/",
      },
      {
        id: 14,
        title: "GAP",
        filename: "gap",
        logo: "image/store/usa/gap.png",
        link: "https://www.gapcanada.ca/",
      },

      {
        id: 15,
        title: "Hudson's Bay",
        filename: "hudson",
        logo: "image/store/usa/hudsonbay.jpg",
        link: "https://www.thebay.com/",
      },
      {
        id: 16,
        title: "Under Armour",
        filename: "under",
        logo: "image/store/usa/under.png",
        link: "https://www.underarmour.ca/en-ca/",
      },
      {
        id: 17,
        title: "New Balance",
        filename: "newbalance",
        logo: "image/store/usa/newbalance.png",
        link: "https://www.newbalance.ca/",
      },
      {
        id: 18,
        title: "MAC",
        filename: "mac",
        logo: "image/store/usa/mac-1.png",
        link: "https://www.maccosmetics.ca/",
      },

      {
        id: 19,
        title: "Google Store USA",
        filename: "google-play",
        logo: "image/store/usa/google-play.png",
        link: "https://store.google.com/ca/?pli=1&hl=en-GB",
      },

      {
        id: 20,
        title: "Puma",
        filename: "puma",
        logo: "image/store/usa/puma.png",
        link: "https://ca.puma.com/ca/en",
      },
      {
        id: 21,
        title: "HudaBeauty",
        filename: "HudaBeauty",
        logo: "image/store/usa/huda-beauty.png",
        link: "https://hudabeauty.com/en_CA/home?changeCountry=true",
      },
      {
        id: 22,
        title: "Aldo",
        filename: "Aldo",
        logo: "image/store/usa/aldo.jpg",
        link: "https://www.aldoshoes.com/ca/en",
      },
      {
        id: 1,
        title: "Zara",
        filename: "Zara",
        logo: "image/store/usa/Zarra.jpg",
        link: "https://www.zara.com/ca/",
      },
    ],
    uae: [
      {
        id: 1,
        title: "Amazon",
        filename: "amazon",
        logo: "image/store/usa/amazon.png",
        link: "https://www.amazon.com/",
      },
      {
        id: 2,
        title: "Walmart",
        filename: "walmart",
        logo: "image/store/usa/walmart.png",
        link: "https://www.walmart.com/",
      },
      {
        id: 3,
        title: "BestBuy",
        filename: "best-buy",
        logo: "image/store/usa/best-buy.png",
        link: "https://www.bestbuy.com/?intl=nosplash",
      },
      {
        id: 4,
        title: "Nike US",
        filename: "nike",
        logo: "image/store/usa/nike.png",
        link: "https://www.nike.com/",
      },
      {
        id: 5,
        title: "Target",
        filename: "target",
        logo: "image/store/usa/target.png",
        link: "https://www.target.com/",
      },
      {
        id: 1,
        title: "Ebay US",
        filename: "ebay",
        logo: "image/store/usa/ebay.png",
        link: "https://www.ebay.com/",
      },
      {
        id: 6,
        title: "Apple",
        filename: "apple",
        logo: "image/store/usa/apple.png",
        link: "https://www.apple.com/",
      },
      {
        id: 7,
        title: "Fossil",
        filename: "fossil",
        logo: "image/store/usa/fossil.png",
        link: "https://www.fossil.com/en-us/",
      },
      {
        id: 8,
        title: "Adidas US",
        filename: "adidas",
        logo: "image/store/usa/adidas.png",
        link: "https://www.adidas.com/us",
      },
      {
        id: 9,
        title: "michael kors",
        filename: "kros",
        logo: "image/store/usa/kros.png",
        link: "https://www.michaelkors.com",
      },
      {
        id: 10,
        title: "Victoria's Secret",
        filename: "Victoria-Secret-Logo",
        logo: "image/store/usa/Victoria-Secret-Logo.png",
        link: "https://www.victoriassecret.com/",
      },
      {
        id: 11,
        title: "Sephora USA",
        filename: "sephora",
        logo: "image/store/usa/sephora.png",
        link: " https://www.sephora.com/",
      },
      {
        id: 12,
        title: "H&M USA",
        filename: "h&m",
        logo: "image/store/usa/h&m.png",
        link: "https://www2.hm.com/en_us/productpage.0993000001.html",
      },

      {
        id: 13,
        title: "Jomashop",
        filename: "jomashop",
        logo: "image/store/usa/jomashop.png",
        link: "https://www.jomashop.com/",
      },
      {
        id: 14,
        title: "B&H Photo Video",
        filename: "bnh",
        logo: "image/store/usa/bnh.png",
        link: "https://www.bhphotovideo.com/",
      },

      {
        id: 15,
        title: "Macy's",
        filename: "macys",
        logo: "image/store/usa/macys-1.png",
        link: "https://www.macys.com/",
      },
      {
        id: 16,
        title: "Under Armour",
        filename: "under",
        logo: "image/store/usa/under.png",
        link: "https://www.underarmour.com/",
      },
      {
        id: 17,
        title: "New Balance",
        filename: "newbalance",
        logo: "image/store/usa/newbalance.png",
        link: "https://www.newbalance.com",
      },
      {
        id: 18,
        title: "MAC",
        filename: "mac",
        logo: "image/store/usa/mac-1.png",
        link: "https://www.maccosmetics.com",
      },

      {
        id: 19,
        title: "Google Store USA",
        filename: "google-play",
        logo: "image/store/usa/google-play.png",
        link: "https://store.google.com/us/?hl=en-US&regionRedirect=true",
      },

      {
        id: 20,
        title: "Puma",
        filename: "puma",
        logo: "image/store/usa/puma.png",
        link: "https://us.puma.com",
      },
      {
        id: 21,
        title: "HudaBeauty",
        filename: "HudaBeauty",
        logo: "image/store/usa/huda-beauty.png",
        link: "https://hudabeauty.com/",
      },
      {
        id: 22,
        title: "RayBan",
        filename: "RayBan",
        logo: "image/store/usa/ray-ban.png",
        link: "https://www.ray-ban.com/",
      },
      {
        id: 1,
        title: "Reebok",
        filename: "Reebok",
        logo: "image/store/usa/reebok.png",
        link: "https://www.reebok.com/",
      },
    ],
  },
  bankIcons: [
    {
      icon: "../image/bank_icon/bkash.png",
      name: "demo",
      link: "",
    },
    {
      icon: "../image/bank_icon/AE.png",
      name: "demo",
    },
    {
      icon: "../image/bank_icon/master.png",
      name: "demo",
    },
    {
      icon: "../image/bank_icon/paypal.png",
      name: "demo",
    },
    {
      icon: "../image/bank_icon/visa.png",
      name: "demo",
    },
    {
      icon: "../image/bank_icon/rocket.png",
      name: "demo",
    },
  ],

  init() {
    this.getStoresByQueryParams();
    this.isLoading = false;
  },

  countryCodeFromLocation() {
    let queryString = window.location.search;
    if (!queryString) return "usa";

    let urlParams = new URLSearchParams(queryString);
    let countryCode = urlParams.get("countryCode");
    return countryCode;
  },

  getStoresByQueryParams() {
    let countryCode = this.countryCodeFromLocation();
    console.log(countryCode);
    this.query = this.queries[countryCode];
    this.store = this.stores[countryCode];
    this.search_placeholder = this.search_placeholders[countryCode];
    this.countryName = this.countryNames[countryCode];
  },

  setCurrentStore(store) {
    this.selectedLink = store.link;
  },
};
