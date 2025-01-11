import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Utensils,
  GraduationCap,
  Bus,
  Music,
  MoreHorizontal,
  ShoppingCartIcon,
} from 'lucide-react';
import '../../dashbordComponent/catogorycard/catogorycard.css';

const CategoryCard = () => {
  const [categories, setCategories] = useState([
    { icon: Utensils, category: 'Foods', amount: 0, bgColor: 'bg-blue-100' },
    { icon: GraduationCap, category: 'Education', amount: 0, bgColor: 'bg-orange-100' },
    { icon: Bus, category: 'Transport', amount: 0, bgColor: 'bg-green-100' },
    { icon: ShoppingCartIcon, category: 'Shopping', amount: 0, bgColor: 'bg-red-100' },
    { icon: MoreHorizontal, category: 'Other', amount: 0, bgColor: 'bg-purple-100' },
  ]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in localStorage');
      return;
    }

    const fetchData = async (email) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getCatogoryTotal/${email}`);
        const data = response.data;

        // Update categories state with fetched data
        const updatedCategories = categories.map((category) => {
          const match = data.find((item) => item.category.toLowerCase() === category.category.toLowerCase());
          return match ? { ...category, amount: match.total_price } : category;
        });
        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error fetching category totals:', error);
      }
    };

    fetchData(userEmail);
  }, []);

  const renderCategoryCard = (cat) => (
    <div key={cat.category} className={`p-4 rounded-lg ${cat.bgColor} flex items-center space-x-3 w-48`}>
      <div className="bg-white/90 p-2 rounded-lg">
        <cat.icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{cat.category}</p>
        <p className="text-xl font-bold text-gray-900">{cat.amount}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 cardmain-w">
      <div className="flex flex-row gap-4 items-center flex-wrap justify-center">
        {categories.map(renderCategoryCard)}
      </div>
    </div>
  );
};

export default CategoryCard;