const SearchBarComponent = {
  value: "",
  buttonLabel: "Search",

  async search() {
      if (this.value == "") return

      let validationResult = validate.single(this.value, { presence: true, url: true })

      if (validationResult) {
          window.location = "/search/" + this.value;
          return 0;
      }

      localStorage.setItem("reviewPriceUrl", this.value)
      localStorage.setItem("origin", this.countryCodeFromLocation())
      
    
      const data = this.value;
      const response = await axios.post("/geturl", {"url":data});
      const detail = response.data;
      
   
      if(detail.exists){
              let url = '/item/'+detail.id+'/'+detail.title;
              window.location = url;
      }

      else{
      const url = this.value;
      const rejected = await axios.post("/checklink", {"url":url});
      const rejected_link = rejected.data;
      const Previously_solved = await axios.post("/prevOrder", {"url":url});
      console.log('so far so good, previous solved data e dhukse', Previously_solved);
      const solved_res = Previously_solved.data;
      console.log(Previously_solved,rejected_link );
      
      if(solved_res.exists==true && rejected_link.exists==false ){
          console.log(' system solve api te dhukse');
          const response = await axios.post("/systemsolve", {"product_url":url});
          setTimeout(function(){ window.location = "/requests/approved"; }, 2500);
      }
      else {
          window.location = "/product-review/";        
      }
      }
  },

  countryCodeFromLocation() {
      let queryString = window.location.search
      if (!queryString) return "USA"

      let urlParams = new URLSearchParams(queryString)
      let countryCode = urlParams.get("countryCode")
      return countryCode.toUpperCase()
  },
}

const ReviewPriceComponent = {
  isLoading: true,
  title: "Non Amazon Item",
  link: null,

  init() {
      this.link = localStorage.getItem("reviewPriceUrl")

      if (!this.link) {
          window.location = "/"
          return
      }

      if (this.isAmazonUrl(this.link)) {
          this.title = "Amazon Item"
      }

      this.isLoading = false
  },

  isAmazonUrl(url) {
      return url.startsWith("https://www.amazon")
  },

  extractTitleFromAmazonUrl(url) {
      const regex = "";
      const result = [...url.matchAll(regex)]

      if (!result.length) {
          return "Non Amazon Item"
      }

      return result[0][0].split("-").join(" ")
  },

  getOrigin() {
      if (this.link.includes(".co.uk/") || this.link.includes(".uk/")) {
          return "UK"
      } else if (this.link.includes(".in")) {
          return "India"
      } else {
          let originBasedOnQueryString = localStorage.getItem("origin")
          if(!originBasedOnQueryString) return "USA"
          return originBasedOnQueryString
      }
  }
}

const ChangeCountryComponent = {
  selectedCountryCode: null,
  countries: [
      {
          code: "usa",
          name: "USA"
      },
      {
          code: "uk",
          name: "UK"
      },
      // {
      //     code: "in",
      //     name: "India"
      // }
  ],

  countryCodeFromLocation() {
      let queryString = window.location.search
      if (!queryString) return this.countries[0].code

      let urlParams = new URLSearchParams(queryString)
      let countryCode = urlParams.get("countryCode")
      return countryCode
  },

  gotoStore() {
      if (this.selectedCountryCode === 'usa') {
          window.location = "/"
          return
      }

      window.location = "/stores/?countryCode=" + this.selectedCountryCode
  }
}