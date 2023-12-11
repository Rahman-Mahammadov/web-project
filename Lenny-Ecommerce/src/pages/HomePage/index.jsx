import React from "react";

import { Header, FeaturedCategories, PopularProducts, DiscountProduct, HomepageArticles } from "../../components";

export const HomePage = ()=>{

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