import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // CATEGORY TOGGLE
  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setCategoryFilter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  //  SUB-CATEGORY TOGGLE
  const toggleSubCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setSubCategoryFilter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // APPLY ALL FILTERS
  const applyFilters = () => {
    let filtered = [...products];

    // SEARCH
    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY
    if (categoryFilter.length > 0) {
      filtered = filtered.filter(item =>
        categoryFilter.includes(item.category)
      );
    }

    // SUB-CATEGORY
    if (subCategoryFilter.length > 0) {
      filtered = filtered.filter(item =>
        subCategoryFilter.includes(item.subCategory)
      );
    }

    setFilterProducts(filtered);
  };

  // SORT
  const sortProducts = () => {
    let sorted = [...filterProducts];

    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  };
useEffect(() => {
  if (!products || products.length === 0) {
    setFilterProducts([]);
    return;
  }

  let temp = [...products];

  // SEARCH
  if (showSearch && search) {
    temp = temp.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // CATEGORY FILTER (array)
  if (categoryFilter.length > 0) {
    temp = temp.filter(item =>
      categoryFilter.includes(item.category.toLowerCase())
    );
  }

  // SUB CATEGORY FILTER (array)
  if (subCategoryFilter.length > 0) {
    temp = temp.filter(item =>
      subCategoryFilter.includes(item.subCategory.toLowerCase())
    );
  }

  // SORT
  if (sortType === 'low-high') {
    temp.sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-low') {
    temp.sort((a, b) => b.price - a.price);
  }

  setFilterProducts(temp);

}, [
  products,
  categoryFilter,
  subCategoryFilter,
  search,
  showSearch,
  sortType
]);



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTER SECTION */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div className={`border border-gray-300 mt-6 py-3 pl-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2'>
              <input type="checkbox" value="men" onChange={toggleCategory} /> Men
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="women" onChange={toggleCategory} /> Women
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="kids" onChange={toggleCategory} /> Kids
            </label>
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className={`border border-gray-300 my-5 py-3 pl-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2'>
              <input type="checkbox" value="topwear" onChange={toggleSubCategory} /> Topwear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="bottomwear" onChange={toggleSubCategory} /> Bottomwear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="winterwear" onChange={toggleSubCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1="ALL" text2="COLLECTION" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 text-sm px-2'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map(item => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
