import { instance } from "."

export const getCategories = async ()=>{
    const res = await instance.get("/categories")
    return res;
}

export const getProductsByCategories = async (category)=>{
    const res = await instance.get(`/products?filters[category][$eq]=${category}`);
    return res;
    
}
// http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=2&randomSort=true
export const getProducts = async ()=>{
    const res = await instance.get("/products?randomSort=true");
    return res;
}

export const getSingleProduct = async (id)=>{
    const res = await instance.get(`/products/${id}?populate=*`);
    return res
}

export const getHomepageProducts = async (page)=>{
    const res = await instance.get(`/products?pagination[page]=${page}&pagination[pageSize]=4&randomSort=true&populate=*`);
    return res;
}



