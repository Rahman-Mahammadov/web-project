import React from "react";

import { Header, FeaturedCategories, PopularProducts, DiscountProduct, HomepageArticles } from "../../components";

export const HomePage = ()=>{

  React.useEffect(()=>{
    window.scroll(0,0)
  },[])

    return (
        <>
          <Header/>
          <FeaturedCategories/>
          <PopularProducts/>
          <DiscountProduct/>
          <HomepageArticles/>
          
        </>
    )
}