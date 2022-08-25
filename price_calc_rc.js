let theOrderId = document.getElementById("orderIdSpanElem").innerHTML
let jsonOrderByIdEndpoint = `${window.location.origin}/api/v1/getjson/orders/${theOrderId}`;

class PriceCalculator extends React.Component {

  constructor(){
    super()
    this.state = {
      jsonOrder : {},
      productName : 0,
      productImage : 0,
      productNote : 0,
      productBasePrice : 0,
      productPriceBeforeDiscount : 0,
      productBaseWeightKg : 0,
      productBaseWeightLb : 0,
      productShippingCharge : 0,
      requestCompleted : false,
      productLengthInch : 0,
      productWidthInch : 0,
      productHeightInch : 0,
      productDimentionalWeightInLb : 0,
      productDimentionalWeightInKg : 0,
      backpackWeightInKg : 0,
      backpackWeightInPound : 0,
      backpackServiceFeeUSD : 0,
      backpackWeightFeeUSD : 0,
      productCheckoutPrice : 0,
      backpackCheckoutPriceUSD : 0,
      backpricepackWeightFeeUSD: 0,
      sellerTakesBDT : 0,
      travellerTakesBDT : 0,
      backpackTakesBDT : 0,
      backpackTotalBDT : 0,
      airbringrProductPriceBDT : 0,
      airbringrTravellerFeeBDT : 0,
      airbringrServiceFeeBDT : 0,
      airbringrTotalBDT : 0,
      crrBDT : 0,
      crrUSD : 0,
      rrrBDT : 0,
      crrReached : 0,
      // extraFees : 0,
      backpackSavingsBDT : 0,
      backpackSavingsPercent : 0,
      airbringrServiceFeePercent : 0,
      airbringrTravelerFeePercent : 0,
      origin:'USA',
      isReseller: false,
      isRejected: false,
      isSilentShopper: false,
      isHighgValueShopper: false
    }
  }

  CALC_RATES = {
    AIRBRINGR_TRAVELLER_FEE_USD_PER_KG : 15,
    AIRBRINGR_RRR_USD_PER_KG : 30,
    AIRGRINR_MINCRR_USD_PER_KG : 25,
    BACKPACK_US_SALES_TAX_PERCENT : 9,
    BACKPACK_SERVICE_FEE_PERCENT : 20,
    BACKPACK_TRAVELLER_FEE_PER_POUND : 7.5,
    SAVINGS_FROM_BACKPACK_PERCENT : 3
  }

  EXCHANGE_RATES = {
    USD_TO_BDT : 109,
    // USD_TO_BDT_FOR_TF : 95,
    OZ_TO_KG : 0.0283495,
    KG_TO_POUND : 2.20462,
    KG_TO_OZ :35.2,
    POUND_TO_KG : 0.453592
  }


  componentDidMount(){
    this.getJSONOrder()
  }

	componentDidUpdate(prevProps, prevState) {
		var total_price = this.state.airbringrTotalBDT
		document.getElementById('order_total').value = Math.ceil(Number(total_price))
	}


  async getJSONOrder(){
    var initialResponse = await fetch(jsonOrderByIdEndpoint);
    var initialJsonResponse = await initialResponse.json()

    let isRejected = initialJsonResponse.jsonOrder.is_rejected_url
    let isReseller = initialJsonResponse.jsonOrder.is_a_reseller
    let isHighgValueShopper = initialJsonResponse.jsonOrder.is_a_high_value
    let isSilentShopper = initialJsonResponse.jsonOrder.is_a_silent
    console.log(isRejected)
    console.log(isReseller)
    console.log(isHighgValueShopper)
    console.log(isSilentShopper)
    let prevLength = initialJsonResponse.jsonOrder.product_length_in
    let prevWidth = initialJsonResponse.jsonOrder.product_width_in
    let prevHeight = initialJsonResponse.jsonOrder.product_height_in
    let basePrice = initialJsonResponse.jsonOrder.product_base_price_usd
    let shippingPrice = this.state.productShippingCharge

    let checkoutPrice = basePrice + shippingPrice
    let backPackServiceFee = checkoutPrice * this.CALC_RATES.BACKPACK_SERVICE_FEE_PERCENT / 100
    let backpackCheckoutPrice = checkoutPrice + checkoutPrice * this.CALC_RATES.BACKPACK_US_SALES_TAX_PERCENT / 100
    let airbringrProductPrice = backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT
    let sellerTakes = backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT

    let existingWeight = initialJsonResponse.jsonOrder.product_weight_kg
    let existingWeightInLb = existingWeight * this.EXCHANGE_RATES.KG_TO_POUND
    let dimentionalWeightInKg = ((((prevLength*prevWidth*prevHeight)/166)*16)*this.EXCHANGE_RATES.OZ_TO_KG)
    let dimentionalWeightInLb = dimentionalWeightInKg * this.EXCHANGE_RATES.KG_TO_POUND

    let maxWeight = 0;
    let maxWeightPound = 0;
    let backpackWeightFee = 0;
    let travellerTakes = 0;
    let backpackTakes = 0;

    if (existingWeight > dimentionalWeightInKg){
      maxWeight = existingWeight
    } else {
      maxWeight = dimentionalWeightInKg
    }
    let airbringrTravellerFee = maxWeight * this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT
    maxWeightPound = maxWeight * this.EXCHANGE_RATES.KG_TO_POUND
    backpackWeightFee = maxWeightPound * this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND
    travellerTakes = backpackWeightFee * this.EXCHANGE_RATES.USD_TO_BDT
    var backpackSD = backPackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes
    let amountToReduce = airbringrProductPrice + airbringrTravellerFee + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    let airbringrServiceFee = backpackTotal - amountToReduce
    airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let CRR_IN_BDT = airbringrServiceFee + airbringrTravellerFee
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = maxWeight * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT
    let crrReached = CRR_IN_USD / maxWeight
    let airbringrServiceFeePercent = airbringrServiceFee / airbringrProductPrice * 100
    let airbringrTravelerFeePercent = airbringrTravellerFee / airbringrProductPrice * 100
    let airbringrTotal = airbringrProductPrice + airbringrTravellerFee + airbringrServiceFee
    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100
    let productName = initialJsonResponse.jsonOrder.product_title
    let productImage = initialJsonResponse.jsonOrder.product_main_img
    let productPriceBeforeDiscount = initialJsonResponse.jsonOrder.price_before_discount
    let productNote = initialJsonResponse.jsonOrder.customer_note


    await this.setState({
      jsonOrder : initialJsonResponse.jsonOrder,
      requestCompleted : true,
      productName : productName,
      productImage : productImage,
      productPriceBeforeDiscount : productPriceBeforeDiscount,
      productNote : productNote,
      productBasePrice : initialJsonResponse.jsonOrder.product_base_price_usd,
      productBaseWeightKg : initialJsonResponse.jsonOrder.product_weight_kg,
      productBaseWeightLb : existingWeightInLb,
      productLengthInch : initialJsonResponse.jsonOrder.product_length_in,
      productWidthInch : initialJsonResponse.jsonOrder.product_width_in,
      productHeightInch : initialJsonResponse.jsonOrder.product_height_in,
      productDimentionalWeightInLb : dimentionalWeightInLb,
      productDimentionalWeightInKg : dimentionalWeightInKg,
      backpackWeightInKg : maxWeight,
      backpackWeightInPound : maxWeightPound,
      backpackServiceFeeUSD : backPackServiceFee,
      backpackWeightFeeUSD : backpackWeightFee,
      productCheckoutPrice : checkoutPrice,
      backpackCheckoutPriceUSD : backpackCheckoutPrice,
      sellerTakesBDT : sellerTakes,
      travellerTakesBDT : travellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrProductPriceBDT : airbringrProductPrice,
      airbringrTravellerFeeBDT : airbringrTravellerFee,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      // extraFees : extraServiceFees,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : airbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent,
      isReseller : initialJsonResponse.jsonOrder.is_rejected_url,
      isRejected : initialJsonResponse.jsonOrder.is_rejected_url,
      isHighgValueShopper : initialJsonResponse.jsonOrder.is_a_high_value,
      isSilentShopper : initialJsonResponse.jsonOrder.is_a_silent
    })
  }


  handleBasePriceChange(price){

    let existingShippingCharge = Number(parseFloat(this.state.productShippingCharge).toFixed(2))
    let newCheckoutPrice = existingShippingCharge + Number(parseFloat(price).toFixed(2))
    let backpackServiceFee = newCheckoutPrice * this.CALC_RATES.BACKPACK_SERVICE_FEE_PERCENT / 100
    let backpackCheckoutPrice = newCheckoutPrice + newCheckoutPrice * this.CALC_RATES.BACKPACK_US_SALES_TAX_PERCENT / 100

    let airbringrProductPrice = Math.ceil(backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT)
    let sellerTakes = backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT

    let weightFee = Number(parseFloat(this.state.backpricepackWeightFeeUSD).toFixed(2))
    var backpackSD = backpackServiceFee - weightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let travellerTakes = Number(parseFloat(this.state.travellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = airbringrProductPrice + Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    //customised AF code here
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let  newAirbringrServiceFeePercent 
    let existingBasePrice = Number(parseFloat(price).toFixed(2))
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <=99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <=200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <=500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(airbringrProductPrice).toFixed(2)) 
    
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee

    let CRR_IN_BDT = airbringrServiceFee +  Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2))
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = Number(parseFloat(this.state.backpackWeightInKg).toFixed(2)) * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / Number(parseFloat(this.state.backpackWeightInKg).toFixed(2))

    // airbringrServiceFee += extraServiceFees
    // let airbringrServiceFeePercent = airbringrServiceFee / airbringrProductPrice * 100

    let airbringrTravelerFeePercent = Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) / airbringrProductPrice * 100
    let airbringrTotal =  airbringrProductPrice + Number(parseFloat(this.state.travellerTakesBDT).toFixed(2)) + airbringrServiceFee

    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productBasePrice : price,
      productCheckoutPrice : newCheckoutPrice,
      backpackServiceFeeUSD : backpackServiceFee,
      backpackCheckoutPriceUSD : backpackCheckoutPrice,
      sellerTakesBDT : sellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrProductPriceBDT : airbringrProductPrice,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }

  handleOzToKgChange(weight){
    this.state.productBaseWeightKg = weight * this.EXCHANGE_RATES.OZ_TO_KG
    this.handleBaseWeightChange(this.state.productBaseWeightKg)
  }
  handleBaseWeightChange(weight){
    let currentWeight = weight
    // let currentWeightLB = currentWeight * this.EXCHANGE_RATES.KG_TO_POUND
    let dimentionalWeight = this.state.productDimentionalWeightInKg
    let maxWeight = 0;
    let maxWeightPound = 0;
    let backpackWeightFee = 0;
    let travellerTakes = 0;

    if (currentWeight > dimentionalWeight){
      maxWeight = currentWeight
    } else {
      maxWeight = dimentionalWeight
    }

    let airbringrTravellerFee = maxWeight * this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    maxWeightPound = maxWeight * this.EXCHANGE_RATES.KG_TO_POUND
    backpackWeightFee = maxWeightPound * this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND
    travellerTakes = backpackWeightFee * this.EXCHANGE_RATES.USD_TO_BDT

    let backPackServiceFee = Number(parseFloat(this.state.backpackServiceFeeUSD).toFixed(2))
    var backpackSD = backPackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let sellerTakes = Number(parseFloat(this.state.sellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let backpackCheckoutPrice = this.state.backpackCheckoutPriceUSD
    let  newAirbringrServiceFeePercent 
    let existingBasePrice = Number(parseFloat(this.state.productBasePrice).toFixed(2))
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <= 99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <= 200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <= 500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) 

    let CRR_IN_BDT = airbringrServiceFee + airbringrTravellerFee
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = maxWeight * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / maxWeight
    
    // let airbringrServiceFeePercent = airbringrServiceFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTravelerFeePercent = airbringrTravellerFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100

    let airbringrTotal = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + airbringrServiceFee

    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productBaseWeightKg : weight,
      productBaseWeightLb : weight*this.EXCHANGE_RATES.KG_TO_POUND,
      backpackWeightInKg : maxWeight,
      backpackWeightInPound : maxWeightPound,
      backpackWeightFeeUSD : backpackWeightFee,
      travellerTakesBDT : travellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrTravellerFeeBDT : airbringrTravellerFee,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }


  handleShippingWeightChange(weightCharge){

    let existingBasePrice = Number(parseFloat(this.state.productBasePrice).toFixed(2))
    let newCheckoutPrice = existingBasePrice + Number(parseFloat(weightCharge).toFixed(2))
    let backpackServiceFee = newCheckoutPrice * this.CALC_RATES.BACKPACK_SERVICE_FEE_PERCENT / 100
    let backpackCheckoutPrice = newCheckoutPrice + newCheckoutPrice * this.CALC_RATES.BACKPACK_US_SALES_TAX_PERCENT / 100
    let airbringrProductPrice = Math.ceil(backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT)

    let sellerTakes = backpackCheckoutPrice * this.EXCHANGE_RATES.USD_TO_BDT

    let backpackWeightFee = Number(parseFloat(this.state.backpackWeightFeeUSD).toFixed(2))
    var backpackSD = backpackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let travellerTakes = Number(parseFloat(this.state.travellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = airbringrProductPrice + Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let  newAirbringrServiceFeePercent 
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <=99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <=200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <=500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(airbringrProductPrice).toFixed(2))

    let CRR_IN_BDT = airbringrServiceFee + Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2))
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = Number(parseFloat(this.state.backpackWeightInKg).toFixed(2)) * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / Number(parseFloat(this.state.backpackWeightInKg).toFixed(2))

    // airbringrServiceFee += extraServiceFees
    // let airbringrServiceFeePercent = airbringrServiceFee / airbringrProductPrice * 100
    let airbringrTravelerFeePercent = Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) / airbringrProductPrice * 100
    let airbringrTotal = airbringrProductPrice + Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) + airbringrServiceFee

    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productCheckoutPrice : newCheckoutPrice,
      backpackServiceFeeUSD : backpackServiceFee,
      productShippingCharge : weightCharge,
      backpackCheckoutPriceUSD : backpackCheckoutPrice,
      sellerTakesBDT : sellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrProductPriceBDT : airbringrProductPrice,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      // extraFees : extraServiceFees,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }


  // handleBackpackSavingsPercentChange(percent){
    
  // }

  handleRequiredAfChange(percent){
    console.log(percent)
    let  newAirbringrServiceFeePercent =  percent
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) 
    let airbringrTravelerFeePercent = Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let CRR_IN_BDT = airbringrServiceFee +  Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2))
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = Number(parseFloat(this.state.backpackWeightInKg).toFixed(2)) * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / Number(parseFloat(this.state.backpackWeightInKg).toFixed(2))
    let airbringrTotal =  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2)) + airbringrServiceFee
    let backpackSavings = Number(parseFloat(this.state.backpackTotalBDT).toFixed(2)) - airbringrTotal
    let savingsPercent = backpackSavings / Number(parseFloat(this.state.backpackTotalBDT).toFixed(2)) * 100

    this.setState({
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
      
    })
  }

  handleLengthInchChange(length){
    let currentWeight = this.state.productBaseWeightKg
    let maxWeight = 0;
    let maxWeightPound = 0;
    let backpackWeightFee = 0;
    let travellerTakes = 0;
    let prevWidth = this.state.productWidthInch
    let prevHeight = this.state.productHeightInch

    let newDimentionalWeightInKg = ((((length*prevWidth*prevHeight)/166)*16)*this.EXCHANGE_RATES.OZ_TO_KG)
    let newDimentionalWeightInLb = newDimentionalWeightInKg * this.EXCHANGE_RATES.KG_TO_POUND

    if (currentWeight > newDimentionalWeightInKg){
      maxWeight = currentWeight
    } else {
      maxWeight = newDimentionalWeightInKg
    }

    let airbringrTravellerFee = maxWeight * this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    maxWeightPound = maxWeight * this.EXCHANGE_RATES.KG_TO_POUND
    backpackWeightFee = maxWeightPound * this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND
    travellerTakes = backpackWeightFee * this.EXCHANGE_RATES.USD_TO_BDT

    let backPackServiceFee = Number(parseFloat(this.state.backpackServiceFeeUSD).toFixed(2))
    var backpackSD = backPackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let sellerTakes = Number(parseFloat(this.state.sellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let backpackCheckoutPrice = this.state.backpackCheckoutPriceUSD
    let  newAirbringrServiceFeePercent 
let existingBasePrice = Number(parseFloat(this.state.productBasePrice).toFixed(2))
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <=99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <=200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <=500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2))

    let CRR_IN_BDT = airbringrServiceFee + airbringrTravellerFee
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = maxWeight * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / maxWeight

    // airbringrServiceFee += extraServiceFees
    // let airbringrServiceFeePercent =  airbringrServiceFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTravelerFeePercent =  airbringrTravellerFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTotal = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + airbringrServiceFee

    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productLengthInch : length,
      productDimentionalWeightInLb : newDimentionalWeightInLb,
      productDimentionalWeightInKg : newDimentionalWeightInKg,
      backpackWeightInKg : maxWeight,
      backpackWeightInPound : maxWeightPound,
      backpackWeightFeeUSD : backpackWeightFee,
      travellerTakesBDT : travellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrTravellerFeeBDT : airbringrTravellerFee,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      // extraFees : extraServiceFees,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }


  handleWidthInchChange(width){
    let currentWeight = this.state.productBaseWeightKg
    let maxWeight = 0;
    let maxWeightPound = 0;
    let backpackWeightFee = 0;
    let travellerTakes = 0;
    let prevLength = this.state.productLengthInch
    let prevHeight = this.state.productHeightInch

    let newDimentionalWeightInKg = ((((prevLength*width*prevHeight)/166)*16)*this.EXCHANGE_RATES.OZ_TO_KG)
    let newDimentionalWeightInLb = newDimentionalWeightInKg * this.EXCHANGE_RATES.KG_TO_POUND

    if (currentWeight > newDimentionalWeightInKg){
      maxWeight = currentWeight
    } else {
      maxWeight = newDimentionalWeightInKg
    }

    let airbringrTravellerFee = maxWeight * this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    maxWeightPound = maxWeight * this.EXCHANGE_RATES.KG_TO_POUND
    backpackWeightFee = maxWeightPound * this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND
    travellerTakes = backpackWeightFee * this.EXCHANGE_RATES.USD_TO_BDT

    let backPackServiceFee = Number(parseFloat(this.state.backpackServiceFeeUSD).toFixed(2))
    var backpackSD = backPackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let sellerTakes = Number(parseFloat(this.state.sellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let backpackCheckoutPrice = this.state.backpackCheckoutPriceUSD
    let  newAirbringrServiceFeePercent 
let existingBasePrice = Number(parseFloat(this.state.productBasePrice).toFixed(2))
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <=99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <=200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <=500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2))

    let CRR_IN_BDT = airbringrServiceFee + airbringrTravellerFee
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = maxWeight * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT
    let crrReached = CRR_IN_USD / maxWeight

    // airbringrServiceFee += extraServiceFees
    // let airbringrServiceFeePercent = airbringrServiceFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTravelerFeePercent = airbringrTravellerFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTotal = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + airbringrServiceFee
    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productWidthInch : width,
      productDimentionalWeightInLb : newDimentionalWeightInLb,
      productDimentionalWeightInKg : newDimentionalWeightInKg,
      backpackWeightInKg : maxWeight,
      backpackWeightInPound : maxWeightPound,
      backpackWeightFeeUSD : backpackWeightFee,
      travellerTakesBDT : travellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrTravellerFeeBDT : airbringrTravellerFee,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }


  handleHeightInchChange(height){
    let currentWeight = this.state.productBaseWeightKg
    let maxWeight = 0;
    let maxWeightPound = 0;
    let backpackWeightFee = 0;
    let travellerTakes = 0;
    let prevLength = this.state.productLengthInch
    let prevWidth = this.state.productWidthInch

    let newDimentionalWeightInKg = ((((prevLength*prevWidth*height)/166)*16)*this.EXCHANGE_RATES.OZ_TO_KG)
    let newDimentionalWeightInLb = newDimentionalWeightInKg * this.EXCHANGE_RATES.KG_TO_POUND

    if (currentWeight > newDimentionalWeightInKg){
      maxWeight = currentWeight
    } else {
      maxWeight = newDimentionalWeightInKg
    }

    let airbringrTravellerFee = maxWeight * this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    maxWeightPound = maxWeight * this.EXCHANGE_RATES.KG_TO_POUND
    backpackWeightFee = maxWeightPound * this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND
    travellerTakes = backpackWeightFee * this.EXCHANGE_RATES.USD_TO_BDT

    let backPackServiceFee = Number(parseFloat(this.state.backpackServiceFeeUSD).toFixed(2))
    var backpackSD = backPackServiceFee - backpackWeightFee
    backpackSD = backpackSD < 0 ? backpackSD * (-1) : backpackSD
    let backpackTakes = backpackSD * this.EXCHANGE_RATES.USD_TO_BDT

    let sellerTakes = Number(parseFloat(this.state.sellerTakesBDT).toFixed(2))
    let backpackTotal = sellerTakes + travellerTakes + backpackTakes

    // let amountToReduce = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + this.CALC_RATES.SAVINGS_FROM_BACKPACK_PERCENT/100*backpackTotal
    // let airbringrServiceFee = backpackTotal - amountToReduce
    // airbringrServiceFee = airbringrServiceFee < 0 ? airbringrServiceFee * (-1) : airbringrServiceFee
    let isReseller = this.state.isReseller
    let isSilentShopper = this.state.isSilentShopper
    let isHighgValueShopper = this.state.isHighgValueShopper
    let backpackCheckoutPrice = this.state.backpackCheckoutPriceUSD
    let  newAirbringrServiceFeePercent 
let existingBasePrice = Number(parseFloat(this.state.productBasePrice).toFixed(2))
    if(isReseller || isHighgValueShopper || isSilentShopper){
       newAirbringrServiceFeePercent =  14.5;
    }
    else{
      if (existingBasePrice >= 0 && existingBasePrice <=20){
        newAirbringrServiceFeePercent =  16; 
      }
      else if (existingBasePrice >= 20 && existingBasePrice <=40){
          newAirbringrServiceFeePercent =  15.75; 
      }
      else if (existingBasePrice >= 40 && existingBasePrice <=99){
          newAirbringrServiceFeePercent =  15.5; 
      }
      else if (existingBasePrice >= 99 && existingBasePrice <=200){
          newAirbringrServiceFeePercent =  15; 
      }
      else if (existingBasePrice >= 200 && existingBasePrice <=500){
          newAirbringrServiceFeePercent =  14.75; 
      }
      else{
          newAirbringrServiceFeePercent =  14.5; 
      }
    }
    let  airbringrServiceFee = (newAirbringrServiceFeePercent/100) *  Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2))

    let CRR_IN_BDT = airbringrServiceFee + airbringrTravellerFee
    let CRR_IN_USD = CRR_IN_BDT / this.EXCHANGE_RATES.USD_TO_BDT
    let RRR_IN_BDT = maxWeight * this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG * this.EXCHANGE_RATES.USD_TO_BDT

    let crrReached = CRR_IN_USD / maxWeight
    // airbringrServiceFee += extraServiceFees
    // let airbringrServiceFeePercent = airbringrServiceFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTravelerFeePercent = airbringrTravellerFee / Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) * 100
    let airbringrTotal = Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2)) + airbringrTravellerFee + airbringrServiceFee

    let backpackSavings = backpackTotal - airbringrTotal
    let savingsPercent = backpackSavings / backpackTotal * 100

    this.setState({
      productHeightInch : height,
      productDimentionalWeightInLb : newDimentionalWeightInLb,
      productDimentionalWeightInKg : newDimentionalWeightInKg,
      backpackWeightInKg : maxWeight,
      backpackWeightInPound : maxWeightPound,
      backpackWeightFeeUSD : backpackWeightFee,
      travellerTakesBDT : travellerTakes,
      backpackTakesBDT : backpackTakes,
      backpackTotalBDT : backpackTotal,
      airbringrTravellerFeeBDT : airbringrTravellerFee,
      airbringrServiceFeeBDT : airbringrServiceFee,
      airbringrTotalBDT : airbringrTotal,
      crrBDT : CRR_IN_BDT,
      crrUSD : CRR_IN_USD,
      rrrBDT : RRR_IN_BDT,
      crrReached : crrReached,
      backpackSavingsBDT : backpackSavings,
      backpackSavingsPercent : savingsPercent,
      airbringrServiceFeePercent : newAirbringrServiceFeePercent,
      airbringrTravelerFeePercent : airbringrTravelerFeePercent
    })
  }

  render() {
    if (this.state.requestCompleted == true){
      return (
        <div>
            <div className='row'>
              <div className="col-md-4" style={{borderRight: 1, borderLeft: 0, borderTop: 0, borderBottom: 0, borderColor : "black", borderStyle : "solid"}}>

                <div className="m-section__content">
                  <form className="" >
                    <div className="form-group m-form__group">
                      <h5 style={{width: 125, justifyContent : "left"}}>Product Name</h5>
                      <input type='text' className='form-control col-md-12' id='product_title' name="product_url" defaultValue={this.state.jsonOrder.product_title}  style={{fontSize : 14}}/>
                    </div>
                    <div className="form-group m-form__group">
                      <h5 style={{width: 125, justifyContent : "left"}}>Product Image</h5>
                      <input type='text' className='form-control col-md-12' name="product_main_img" defaultValue={this.state.jsonOrder.product_main_img}  style={{fontSize : 14}}/>
                    </div>
        <div className="form-group m-form__group">
            <h5 style={{width: 250, justifyContent : "left"}}>Product Origin</h5>
        <input type='hidden' className='form-control col-md-12' name="product_origin" defaultValue={this.state.jsonOrder.origin}  style={{fontSize : 14}} readonly="true" disabled="true" />
          <select id='origin-change' className='form-control col-md-10' style={{float: "left"}}>
    <option value="USA" selected>USA</option>
          <option value="UK">UK</option>
          <option value="CAD">CAD</option>

      </select>
      <div className="form-control btn btn-light col-md-2 change-origin" style={{float: "left"}}>Change</div>
          </div>
                    <div className="form-group m-form__group">
                      <h5 style={{width: 125, justifyContent : "left"}}>Shopper Notes</h5>
                      <input type='text' className='form-control col-md-10 shoppernotefield' name="customer_note" defaultValue={this.state.jsonOrder.customer_note}  style={{fontSize : 14, float:"left"}} disabled="disabled"/>
                      <a className="form-control btn btn-light col-md-2 editshppernote" style={{float: "right"}}>Edit</a>

                    </div>
                  </form>
                  <h5 style={{ marginTop : 60, marginBottom: 5 }}> Weight : (KG) {Number(parseFloat(this.state.backpackWeightInKg).toFixed(2))}</h5>
                </div>
               </div>

               <div className="col-md-4"  style={{borderRight: 1, borderLeft: 0, borderTop: 0, borderBottom: 0, borderColor : "black", borderStyle : "solid"}}>

                <div className="m-section__content">
                  <form className="form-inline" >


                  <div className="container">
                      <div className="row">
                            <div className="col-md-2" style={{paddingTop : 5, paddingLeft : 0}}>
                                <h5 style={{justifyContent : "left"}}>Base<br/> Price: </h5>
                            </div>
                            <div className="col-md-3"  style={{padding : 0}}>
                                <div className="form-group m-form__group" style={{height : 50}}>
                                  <input type='text' className='form-control col-md-12' name="base_price_usd" defaultValue={this.state.jsonOrder.product_base_price_usd} step="0.01" onChange={e =>  this.handleBasePriceChange(e.target.value || 0) } style={{fontSize : 14}}/>
                                </div>
                            </div>

                            <div className="col-md-3" style={{paddingTop : 5, paddingLeft : 25}}>
                                <h5 style={{justifyContent : "left"}}>List<br/> Price: </h5>
                            </div>
                            <div className="col-md-3"  style={{padding : 0}}>
                                <div className="form-group m-form__group" style={{height : 50}}>
                                  <input type='text' className='form-control col-md-12' name="price_before_discount" defaultValue={this.state.jsonOrder.price_before_discount} step="0.01" style={{fontSize : 14}}/>
                                </div>
                            </div>
                      </div>
                  </div>
        

                    <div className="form-group m-form__group" style={{height : 50}}>
                      {/* <h5 style={{width: 180, justifyContent : "left"}}>Base Weight (KG)</h5> */}
                      <input type='hidden' className='form-control col-md-5' name="base_weight_kg" defaultValue={this.state.jsonOrder.product_weight_kg} step="0.01" onChange={e => this.handleBaseWeightChange(e.target.value || 0)} style={{fontSize : 14}}/>
                    </div>
                    <div className="form-group m-form__group" style={{height : 50}}>
                      <h5 style={{width: 180, justifyContent : "left"}}>Shipping Weight (OZ)</h5>
                      <input type='text' className='form-control col-md-5' name="base_weight_oz" defaultValue={this.state.jsonOrder.product_weight_kg * this.EXCHANGE_RATES.KG_TO_OZ} step="0.01" onChange={e => this.handleOzToKgChange(e.target.value || 0)}  style={{fontSize : 14}}/>
                    </div>

                    
                      <div className="container">
                      <div className="row">
                        <div className="col-md-1" style={{paddingTop : 15, paddingLeft : 0}}>
                        <h5 style={{justifyContent : "left"}}>L</h5>
                        </div>
                        <div className="col-md-2"  style={{padding : 0}}>
                        <div className="form-group m-form__group" style={{height : 50}}>
                          <input type='text' className='form-control col-md-12' name="base_length_inch" defaultValue={this.state.jsonOrder.product_length_in} step="0.01"
                          onChange={e =>  this.handleLengthInchChange(e.target.value || 0) } style={{fontSize : 14}}/>
                        </div>
                        </div>

                        <div className="col-md-1" style={{paddingTop : 15, paddingLeft : 20, paddingRight : 30}}>
                          <h5 style={{justifyContent : "left"}}>W</h5>
                        </div>
                        <div className="col-md-2"  style={{padding : 0}}>
                        <div className="form-group m-form__group" style={{height : 50}}>
                                            <input type='text' className='form-control col-md-12' name="base_width_inch" defaultValue={this.state.jsonOrder.product_width_in} step="0.01"
                                            onChange={e =>  this.handleWidthInchChange(e.target.value || 0) } style={{fontSize : 14}}/>
                                          </div>
                        </div>
                        <div className="col-md-1" style={{paddingTop : 15, paddingLeft : 25, paddingRight : 30}}>
                        <h5 style={{justifyContent : "left"}}>H</h5>

                        </div>
                        <div className="col-md-2"  style={{padding : 0}}>
                        <div className="form-group m-form__group" style={{height : 50}}>
                                            <input type='text' className='form-control col-md-12' name="base_height_inch" defaultValue={this.state.jsonOrder.product_height_in} step="0.01"
                                            onChange={e =>  this.handleHeightInchChange(e.target.value || 0) } style={{fontSize : 14}}/>
                                          </div>
  </div>
  </div>
</div>






                    <div className="form-group m-form__group" style={{height : 50}}>
                      <h5 style={{width: 180, justifyContent : "left"}}>Shipping Charge :</h5>
                      <input type='text' className='form-control col-md-5' name="shipping_charge_usd" defaultValue="0" step="0.01" onChange={e =>this.handleShippingWeightChange(e.target.value || 0)} style={{fontSize : 14}}/>
                    </div>

                    <div className="form-group m-form__group" style={{height : 50}}>
                      <h5 style={{width: 180, justifyContent : "left"}}>BP Savings (%) : </h5>
                      <input  disabled type='text' className='form-control col-md-5' name="backpack_savings_percent" defaultValue={Number(parseFloat(this.state.backpackSavingsPercent).toFixed(2))} step="0.01" onChange={e =>  this.handleBackpackSavingsPercentChange(e.target.value || 0) } style={{fontSize : 14}}/>
                    </div>

                    <div className="form-group m-form__group" style={{height : 50}}>
                      <h5 style={{width: 180, justifyContent : "left"}}>Required AF (%) : </h5>
                      <input type='text' className='form-control col-md-5' name="required_af" defaultValue={Number(parseFloat(this.state.airbringrServiceFeePercent).toFixed(2))} step="0.01" onChange={e =>  this.handleRequiredAfChange(e.target.value || this.state.airbringrServiceFeePercent) } style={{fontSize : 14}}/>
                    </div>


                    <div  style={{ display : "none"}}>
                      <h5 style={{ padding : 5, marginBottom: 5 }}> Dimentional Weight: (LB) {this.state.productDimentionalWeightInLb.toFixed(4)} </h5>
                      <h5 style={{ padding : 5, marginBottom: 5 }}> Dimentional Weight: (KG) {this.state.productDimentionalWeightInKg.toFixed(4)} </h5>
                    </div>

                  </form>

                  <h5 style={{ paddingBottom : 10, paddingTop : 30, marginBottom: 5 }}> Savings from BP : {Number(parseFloat(this.state.backpackSavingsBDT).toFixed(2))}</h5>
                  <h5 style={{  paddingBottom : 10, marginBottom: 5 }}> BP Total (৳) : {Number(parseFloat(this.state.backpackTotalBDT).toFixed(2))}</h5>
                  <div style={{ display : "none" }}>
                  {/* <h5 style={{ padding : 10, marginBottom: 5 }}> Backpack Savings (%) : {this.state.backpackSavingsPercent.toFixed(2)}</h5> */}
                  <h5 style={{ padding : 5, marginBottom: 5 }}> USD Exchange Rate : BDT {this.EXCHANGE_RATES.USD_TO_BDT.toFixed(2)}</h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> AirBringr Traveller Fee $/KG : ${this.CALC_RATES.AIRBRINGR_TRAVELLER_FEE_USD_PER_KG.toFixed(2)}</h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> AirBringr RRR USD/KG : ${this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG.toFixed(2)}</h5>

                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack US Sales Tax : {this.CALC_RATES.BACKPACK_US_SALES_TAX_PERCENT.toFixed(2)} %</h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Service Fee : {this.CALC_RATES.BACKPACK_SERVICE_FEE_PERCENT.toFixed(2)} %</h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Traveller Fee $/LB : ${this.CALC_RATES.BACKPACK_TRAVELLER_FEE_PER_POUND.toFixed(2)} </h5>
                  </div>
                </div>
               </div>

               <div className="col-md-4">
               <div className="m-section__content">

               <table className="table price-breakdown-table">
            <tbody>
            <tr>
            <th style={{ borderTop : 0,  borderRight : 1,   borderLeft : 0,  borderTop : 0,  borderBottom : 0, borderColor:"black", borderStyle: "solid"}}><h5> Base Price : <span id="rct_airbringr_product_price" style={{ float : "right" }}>{Number(parseFloat(this.state.airbringrProductPriceBDT).toFixed(2))}</span></h5>
            </th>
            <td rowSpan="3"  style={{ borderTop : 0}}><h5 style={{ paddingTop : 50}}> <span style={{ display : "block", textAlign: "center", fontWeight: "bold", fontSize: 10 }}>Total</span> <span id="rct_airbringr_total" style={{ display : "block", textAlign: "center", color:"#1ba7f9", fontWeight: "bold", fontSize: 20 }}>{Number(parseFloat(this.state.airbringrTotalBDT).toFixed(2))}</span></h5>
            </td>
            </tr>
            <tr>
            <th  style={{ borderTop : 0}}><h5> TF :<span id="rct_airbringr_traveller_fee" style={{ float : "right" }}>{Number(parseFloat(this.state.airbringrTravellerFeeBDT).toFixed(2))}</span></h5> </th>
            </tr>
            <tr>
            <th style={{ borderTop : 0}}><h5> AF : <span id="rct_airbringr_service_fee" style={{ float : "right" }}>{Number(parseFloat(this.state.airbringrServiceFeeBDT).toFixed(2))}</span></h5>

            </th>
            </tr>
            </tbody>
            </table>

<div>
                  <h5 style={{ padding : 10, marginTop : 40, marginBottom: 5, color: "#fff", backgroundColor:"#005500" }}> AF (%) :  {Number(parseFloat(this.state.airbringrServiceFeePercent).toFixed(2))}</h5>

                  {/* <h5 style={{ padding : 10, marginBottom: 5 }}> Extra Fees : (৳) {Number(parseFloat(this.state.extraFees).toFixed(2))}</h5> */}
                  <h5 style={{ padding : 10, marginBottom: 5, display: "none" }}> RRR : ($) {this.CALC_RATES.AIRBRINGR_RRR_USD_PER_KG.toFixed(2)}</h5>
                  <h5 style={{ padding : 10, marginBottom: 5, display: "none"  }}> RRR : (৳) {Number(parseFloat(this.state.rrrBDT).toFixed(2))}</h5>
                  <h5 style={{ padding : 10, marginBottom: 5, color: "#fff", backgroundColor:"#ff0101"  }}> CRR (%) :  <span id="rct_crr_reached">{Number(parseFloat(this.state.crrReached).toFixed(2))}</span></h5>
                  <h5 style={{ padding : 10, marginBottom: 5, display: "none"}}> CRR : (৳) <span id="rct_crr_bdt">{Number(parseFloat(this.state.crrBDT).toFixed(2))} </span></h5>
                  <h5 style={{ padding : 10, marginBottom: 5 }}> CRR ($) :  <span id="rct_crr_usd">{Number(parseFloat(this.state.crrUSD).toFixed(2))}</span></h5>
                  <h5 style={{ padding : 10, marginBottom: 5,  }}> TF (%) :  {Number(parseFloat(this.state.airbringrTravelerFeePercent).toFixed(2))}</h5>
</div>
                </div>

               </div>
            </div>
            <hr/>
            <div className='row'>
              <div className="col-md-4">


              </div>

              <div className="col-md-4">

                <div className="m-section__content">
                </div>
              </div>

              <div className="col-md-4" style={{ display : "none"}}>

                <div className="m-section__content">
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Weight : (LB) {Number(parseFloat(this.state.backpackWeightInPound).toFixed(2)) } </h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Weight (KG):  {Number(parseFloat(this.state.backpackWeightInKg).toFixed(2)) } </h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Service Fee : ($) {Number(parseFloat(this.state.backpackServiceFeeUSD).toFixed(2)) } </h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Weight Fee : ($) {Number(parseFloat(this.state.backpackWeightFeeUSD).toFixed(2)) } </h5>
                  <h5 style={{ padding : 5, marginBottom: 5 }}> Backpack Checkout Price : ($) {Number(parseFloat(this.state.backpackCheckoutPriceUSD).toFixed(2)) } </h5>
                  <h5 style={{ padding : 10, marginBottom: 5 }}> SELLER Takes : (৳) {Number(parseFloat(this.state.sellerTakesBDT).toFixed(2)) } </h5>
                  <h5 style={{ padding : 10, marginBottom: 5 }}> TRAVELLER Takes : (৳) {Number(parseFloat(this.state.travellerTakesBDT).toFixed(2))}</h5>
                  <h5 style={{ padding : 10, marginBottom: 5 }}> Backpack Takes : (৳) {Number(parseFloat(this.state.backpackTakesBDT).toFixed(2))}</h5>
                  <h5 style={{ padding : 10, marginBottom: 5 }}> Backpack Total : (৳) {Number(parseFloat(this.state.backpackTotalBDT).toFixed(2))}</h5>
                </div>
              </div>
            </div>
        </div>
      )
    } else {
      return (<span>AirBringr Price Calculator - Module Build Failed</span>)
    }

  }
}


ReactDOM.render(<PriceCalculator />, document.getElementById('price_calculator_rc'));
