export const categories = [
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', icon: '🥦', color: 'bg-green-100', count: 120, textColor: 'text-green-700' },
  { id: 'dairy-milk', name: 'Dairy & Milk', icon: '🥛', color: 'bg-blue-100', count: 85, textColor: 'text-blue-700' },
  { id: 'snacks', name: 'Snacks', icon: '🍿', color: 'bg-yellow-100', count: 200, textColor: 'text-yellow-700' },
  { id: 'beverages', name: 'Beverages', icon: '🧃', color: 'bg-orange-100', count: 150, textColor: 'text-orange-700' },
  { id: 'bakery', name: 'Bakery & Bread', icon: '🍞', color: 'bg-amber-100', count: 60, textColor: 'text-amber-700' },
  { id: 'atta-rice', name: 'Atta & Rice', icon: '🌾', color: 'bg-lime-100', count: 90, textColor: 'text-lime-700' },
  { id: 'cooking-oil', name: 'Cooking Oil', icon: '🫙', color: 'bg-yellow-50', count: 45, textColor: 'text-yellow-800' },
  { id: 'household', name: 'Household', icon: '🧹', color: 'bg-purple-100', count: 110, textColor: 'text-purple-700' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴', color: 'bg-pink-100', count: 130, textColor: 'text-pink-700' },
  { id: 'baby-care', name: 'Baby Care', icon: '👶', color: 'bg-rose-100', count: 75, textColor: 'text-rose-700' },
  { id: 'frozen', name: 'Frozen Food', icon: '🧊', color: 'bg-sky-100', count: 50, textColor: 'text-sky-700' },
  { id: 'cleaning', name: 'Cleaning Supplies', icon: '🧽', color: 'bg-teal-100', count: 80, textColor: 'text-teal-700' },
];

export const products = [
  // Fruits
  {
    id: 1, name: 'Fresh Red Apples', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 89, mrp: 120, discount: 26, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    brand: 'Farm Fresh', inStock: true, rating: 4.5, reviews: 234,
    tags: ['fresh', 'organic', 'vitamin-c'], description: 'Crisp and sweet red apples sourced directly from Himachal Pradesh orchards.',
    isOrganic: true, isBestSeller: true
  },
  {
    id: 2, name: 'Cavendish Bananas', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 49, mrp: 60, discount: 18, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
    brand: 'Farm Fresh', inStock: true, rating: 4.3, reviews: 189,
    tags: ['fresh', 'energy'], description: 'Sweet and nutritious bananas, perfect for daily consumption.',
    isBestSeller: true
  },
  {
    id: 3, name: 'Alphonso Mangoes', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 249, mrp: 320, discount: 22, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80',
    brand: 'Ratnagiri Farm', inStock: true, rating: 4.8, reviews: 412,
    tags: ['premium', 'seasonal'], description: 'The king of fruits - premium Ratnagiri Alphonso mangoes.',
    isFeatured: true
  },
  {
    id: 4, name: 'Navel Oranges', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 79, mrp: 100, discount: 21, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80',
    brand: 'Farm Fresh', inStock: true, rating: 4.2, reviews: 156,
    tags: ['vitamin-c', 'fresh'], description: 'Juicy navel oranges rich in Vitamin C.',
  },
  // Vegetables
  {
    id: 5, name: 'Potatoes', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 29, mrp: 40, discount: 28, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.1, reviews: 320,
    tags: ['staple', 'fresh'], description: 'Fresh farm potatoes, essential for daily cooking.',
    isBestSeller: true
  },
  {
    id: 6, name: 'Onions', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 39, mrp: 55, discount: 29, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.0, reviews: 285,
    tags: ['staple', 'fresh'], description: 'Farm-fresh onions, a kitchen essential.',
    isBestSeller: true
  },
  {
    id: 7, name: 'Tomatoes', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 45, mrp: 60, discount: 25, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.3, reviews: 198,
    tags: ['fresh', 'lycopene'], description: 'Ripe, juicy tomatoes for cooking and salads.',
  },
  {
    id: 8, name: 'Carrots', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 55, mrp: 70, discount: 21, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    brand: 'Organic Valley', inStock: true, rating: 4.4, reviews: 145,
    tags: ['organic', 'vitamin-a'], description: 'Crunchy organic carrots rich in beta-carotene.',
    isOrganic: true
  },
  // Dairy
  {
    id: 9, name: 'Amul Full Cream Milk', category: 'dairy-milk', subcategory: 'milk',
    price: 31, mrp: 31, discount: 0, weight: '500', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.7, reviews: 892,
    tags: ['daily-essential', 'calcium'], description: 'Fresh and rich full cream milk from Amul.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 10, name: 'Amul Butter', category: 'dairy-milk', subcategory: 'butter',
    price: 59, mrp: 62, discount: 5, weight: '100', unit: 'g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.8, reviews: 634,
    tags: ['daily-essential'], description: 'Creamy Amul butter, perfect for spreading and cooking.',
    isBestSeller: true
  },
  {
    id: 11, name: 'Britannia Cheese Slices', category: 'dairy-milk', subcategory: 'cheese',
    price: 99, mrp: 110, discount: 10, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
    brand: 'Britannia', inStock: true, rating: 4.5, reviews: 287,
    tags: ['protein', 'kids'], description: 'Processed cheese slices, great for sandwiches and snacks.',
  },
  {
    id: 12, name: 'Nestle Greek Yogurt', category: 'dairy-milk', subcategory: 'yogurt',
    price: 79, mrp: 90, discount: 12, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    brand: 'Nestle', inStock: true, rating: 4.4, reviews: 178,
    tags: ['probiotic', 'protein'], description: 'Thick and creamy Greek yogurt with live cultures.',
  },
  {
    id: 13, name: 'Amul Gold Milk', category: 'dairy-milk', subcategory: 'milk',
    price: 34, mrp: 34, discount: 0, weight: '500', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.6, reviews: 445,
    tags: ['daily-essential', 'calcium', 'gold'], description: 'Premium standardized milk with rich taste.',
    isFeatured: true
  },
  // Bakery
  {
    id: 14, name: 'Britannia Brown Bread', category: 'bakery', subcategory: 'bread',
    price: 45, mrp: 50, discount: 10, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    brand: 'Britannia', inStock: true, rating: 4.3, reviews: 423,
    tags: ['whole-grain', 'daily-essential'], description: 'Soft and nutritious brown bread made with whole wheat.',
    isBestSeller: true
  },
  {
    id: 15, name: 'English Muffins', category: 'bakery', subcategory: 'muffins',
    price: 89, mrp: 100, discount: 11, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80',
    brand: "Baker's Delight", inStock: true, rating: 4.1, reviews: 87,
    tags: ['breakfast'], description: 'Classic English muffins, perfect for breakfast.',
  },
  // Staples
  {
    id: 16, name: 'Aashirvaad Whole Wheat Atta', category: 'atta-rice', subcategory: 'atta',
    price: 295, mrp: 330, discount: 11, weight: '5', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    brand: 'Aashirvaad', inStock: true, rating: 4.6, reviews: 1205,
    tags: ['staple', 'whole-grain'], description: 'Premium whole wheat atta for soft rotis.',
    isBestSeller: true
  },
  {
    id: 17, name: 'India Gate Basmati Rice', category: 'atta-rice', subcategory: 'rice',
    price: 189, mrp: 220, discount: 14, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    brand: 'India Gate', inStock: true, rating: 4.7, reviews: 876,
    tags: ['premium', 'aromatic'], description: 'Aged basmati rice with authentic aroma and taste.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 18, name: 'Fortune Sunflower Oil', category: 'cooking-oil', subcategory: 'sunflower-oil',
    price: 165, mrp: 190, discount: 13, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    brand: 'Fortune', inStock: true, rating: 4.4, reviews: 543,
    tags: ['heart-healthy', 'cooking'], description: 'Light and healthy sunflower oil for daily cooking.',
  },
  // Beverages
  {
    id: 19, name: 'Tropicana Orange Juice', category: 'beverages', subcategory: 'juice',
    price: 99, mrp: 120, discount: 18, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    brand: 'Tropicana', inStock: true, rating: 4.5, reviews: 389,
    tags: ['vitamin-c', 'no-added-sugar'], description: '100% pure orange juice with no added preservatives.',
    isBestSeller: true
  },
  {
    id: 20, name: 'Tata Tea Premium', category: 'beverages', subcategory: 'tea',
    price: 149, mrp: 175, discount: 15, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    brand: 'Tata Tea', inStock: true, rating: 4.6, reviews: 712,
    tags: ['energizing', 'premium'], description: 'Blend of the finest tea leaves for a refreshing cup.',
    isBestSeller: true
  },
  {
    id: 21, name: 'Nescafe Classic Coffee', category: 'beverages', subcategory: 'coffee',
    price: 249, mrp: 280, discount: 11, weight: '100', unit: 'g',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    brand: 'Nescafe', inStock: true, rating: 4.7, reviews: 534,
    tags: ['energizing', 'instant'], description: 'Rich and aromatic instant coffee for a perfect morning.',
    isFeatured: true
  },
  {
    id: 22, name: 'Coca Cola', category: 'beverages', subcategory: 'soft-drinks',
    price: 45, mrp: 50, discount: 10, weight: '750', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80',
    brand: 'Coca Cola', inStock: true, rating: 4.3, reviews: 267,
    tags: ['cold-drink', 'party'], description: 'The classic refreshing carbonated drink.',
  },
  // Snacks
  {
    id: 23, name: "Lay's Classic Salted Chips", category: 'snacks', subcategory: 'chips',
    price: 30, mrp: 35, discount: 14, weight: '73', unit: 'g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    brand: "Lay's", inStock: true, rating: 4.4, reviews: 891,
    tags: ['party-snack', 'crispy'], description: 'Crispy potato chips with just the right amount of salt.',
    isBestSeller: true
  },
  {
    id: 24, name: 'Parle-G Biscuits', category: 'snacks', subcategory: 'biscuits',
    price: 10, mrp: 10, discount: 0, weight: '100', unit: 'g',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
    brand: 'Parle', inStock: true, rating: 4.8, reviews: 2341,
    tags: ['classic', 'tea-time'], description: "India's favorite glucose biscuits, perfect with tea.",
    isBestSeller: true, isFeatured: true
  },
  {
    id: 25, name: 'Haldiram Aloo Bhujia', category: 'snacks', subcategory: 'namkeen',
    price: 89, mrp: 100, discount: 11, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=400&q=80',
    brand: 'Haldiram', inStock: true, rating: 4.6, reviews: 678,
    tags: ['spicy', 'namkeen'], description: 'Crispy and spicy aloo bhujia, the perfect Indian snack.',
    isBestSeller: true
  },
  // Household
  {
    id: 26, name: 'Surf Excel Detergent', category: 'household', subcategory: 'detergent',
    price: 199, mrp: 230, discount: 13, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&q=80',
    brand: 'Surf Excel', inStock: true, rating: 4.5, reviews: 445,
    tags: ['cleaning', 'stain-remover'], description: 'Powerful detergent that removes even the toughest stains.',
    isBestSeller: true
  },
  {
    id: 27, name: 'Vim Dishwash Gel', category: 'household', subcategory: 'dishwash',
    price: 89, mrp: 100, discount: 11, weight: '500', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=400&q=80',
    brand: 'Vim', inStock: true, rating: 4.3, reviews: 312,
    tags: ['kitchen', 'grease-remover'], description: 'Powerful dishwash gel that cuts through grease easily.',
  },
  {
    id: 28, name: 'Lizol Floor Cleaner', category: 'household', subcategory: 'floor-cleaner',
    price: 149, mrp: 175, discount: 15, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    brand: 'Lizol', inStock: true, rating: 4.4, reviews: 234,
    tags: ['disinfectant', 'floor'], description: 'Kills 99.9% of germs and leaves floors sparkling clean.',
  },
  // Frozen
  {
    id: 29, name: 'McCain French Fries', category: 'frozen', subcategory: 'fries',
    price: 149, mrp: 180, discount: 17, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    brand: 'McCain', inStock: true, rating: 4.5, reviews: 567,
    tags: ['frozen', 'quick-cook'], description: 'Golden crispy french fries ready in minutes.',
    isBestSeller: true
  },
  {
    id: 30, name: 'Eggs (Farm Fresh)', category: 'dairy-milk', subcategory: 'eggs',
    price: 89, mrp: 100, discount: 11, weight: '12', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80',
    brand: 'Country Hen', inStock: true, rating: 4.6, reviews: 789,
    tags: ['protein', 'daily-essential'], description: 'Fresh farm eggs, high in protein and nutrients.',
    isBestSeller: true, isFeatured: true
  },
  // More fruits
  {
    id: 31, name: 'Green Grapes', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 89, mrp: 110, discount: 19, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=400&q=80',
    brand: 'Farm Fresh', inStock: true, rating: 4.4, reviews: 167,
    tags: ['fresh', 'seedless'], description: 'Sweet and juicy seedless green grapes.',
    isNew: true
  },
  {
    id: 32, name: 'Watermelon', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 45, mrp: 60, discount: 25, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.3, reviews: 145,
    tags: ['fresh', 'summer', 'hydrating'], description: 'Juicy red watermelon, perfect for summer.',
    isTrending: true
  },
  {
    id: 33, name: 'Pomegranate', category: 'fruits-vegetables', subcategory: 'fruits',
    price: 159, mrp: 190, discount: 16, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400&q=80',
    brand: 'Farm Fresh', inStock: true, rating: 4.6, reviews: 203,
    tags: ['antioxidant', 'premium'], description: 'Ruby red pomegranates, rich in antioxidants.',
    isFeatured: true
  },
  // More vegetables
  {
    id: 34, name: 'Cucumber', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 35, mrp: 45, discount: 22, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.2, reviews: 132,
    tags: ['fresh', 'hydrating', 'salad'], description: 'Crisp cucumbers, perfect for salads and raita.',
  },
  {
    id: 35, name: 'Capsicum (Mixed)', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 65, mrp: 80, discount: 19, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80',
    brand: 'Organic Valley', inStock: true, rating: 4.4, reviews: 98,
    tags: ['colorful', 'stir-fry'], description: 'Fresh mixed bell peppers, red, yellow and green.',
    isOrganic: true, isNew: true
  },
  {
    id: 36, name: 'Spinach (Palak)', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 25, mrp: 35, discount: 29, weight: '250', unit: 'g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    brand: 'Organic Valley', inStock: true, rating: 4.5, reviews: 176,
    tags: ['leafy-green', 'iron', 'organic'], description: 'Fresh, tender spinach leaves rich in iron.',
    isOrganic: true, isBestSeller: true
  },
  {
    id: 37, name: 'Cauliflower', category: 'fruits-vegetables', subcategory: 'vegetables',
    price: 39, mrp: 50, discount: 22, weight: '1', unit: 'pc',
    image: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.1, reviews: 87,
    tags: ['fresh', 'staple'], description: 'Fresh whole cauliflower, great for curries.',
  },
  // More dairy
  {
    id: 38, name: 'Fresh Paneer', category: 'dairy-milk', subcategory: 'paneer',
    price: 89, mrp: 100, discount: 11, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.6, reviews: 356,
    tags: ['protein', 'fresh'], description: 'Soft and fresh cottage cheese, high in protein.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 39, name: 'Amul Fresh Curd', category: 'dairy-milk', subcategory: 'curd',
    price: 40, mrp: 45, discount: 11, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.7, reviews: 512,
    tags: ['probiotic', 'daily-essential'], description: 'Thick and creamy curd made from fresh milk.',
    isBestSeller: true
  },
  {
    id: 40, name: 'Amul Pure Ghee', category: 'dairy-milk', subcategory: 'ghee',
    price: 549, mrp: 600, discount: 9, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.8, reviews: 623,
    tags: ['premium', 'cooking'], description: 'Pure and aromatic desi ghee, traditionally made.',
    isFeatured: true
  },
  {
    id: 41, name: 'Amul Fresh Cream', category: 'dairy-milk', subcategory: 'cream',
    price: 65, mrp: 72, discount: 10, weight: '200', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1600788907416-456578634209?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.4, reviews: 145,
    tags: ['cooking', 'desserts'], description: 'Rich fresh cream for cooking and desserts.',
  },
  // More bakery
  {
    id: 42, name: 'Britannia White Bread', category: 'bakery', subcategory: 'bread',
    price: 40, mrp: 45, discount: 11, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&q=80',
    brand: 'Britannia', inStock: true, rating: 4.2, reviews: 267,
    tags: ['daily-essential'], description: 'Soft and fresh white sandwich bread.',
    isBestSeller: true
  },
  {
    id: 43, name: 'Burger Buns', category: 'bakery', subcategory: 'buns',
    price: 55, mrp: 65, discount: 15, weight: '4', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80',
    brand: "Baker's Delight", inStock: true, rating: 4.3, reviews: 112,
    tags: ['snacks', 'party'], description: 'Soft sesame burger buns, pack of 4.',
    isNew: true
  },
  {
    id: 44, name: 'Butter Croissant', category: 'bakery', subcategory: 'pastry',
    price: 129, mrp: 150, discount: 14, weight: '4', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&q=80',
    brand: "Baker's Delight", inStock: true, rating: 4.5, reviews: 89,
    tags: ['premium', 'breakfast'], description: 'Flaky, buttery croissants baked fresh daily.',
    isFeatured: true, isNew: true
  },
  // More atta/rice/staples
  {
    id: 45, name: 'India Gate Brown Rice', category: 'atta-rice', subcategory: 'rice',
    price: 149, mrp: 175, discount: 15, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=80',
    brand: 'India Gate', inStock: true, rating: 4.4, reviews: 234,
    tags: ['whole-grain', 'healthy'], description: 'Nutritious brown rice, unpolished and healthy.',
    isOrganic: true
  },
  {
    id: 46, name: 'Toor Dal (Arhar)', category: 'atta-rice', subcategory: 'pulses',
    price: 159, mrp: 180, discount: 12, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&q=80',
    brand: 'Tata Sampann', inStock: true, rating: 4.5, reviews: 345,
    tags: ['protein', 'staple'], description: 'Premium quality toor dal, rich in protein.',
    isBestSeller: true
  },
  {
    id: 47, name: 'Tata Sugar', category: 'atta-rice', subcategory: 'sugar',
    price: 49, mrp: 55, discount: 11, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80',
    brand: 'Tata', inStock: true, rating: 4.3, reviews: 198,
    tags: ['staple', 'daily-essential'], description: 'Pure refined sugar for everyday use.',
  },
  {
    id: 48, name: 'Besan (Gram Flour)', category: 'atta-rice', subcategory: 'flour',
    price: 89, mrp: 100, discount: 11, weight: '1', unit: 'kg',
    image: 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=400&q=80',
    brand: 'Aashirvaad', inStock: true, rating: 4.4, reviews: 156,
    tags: ['staple', 'cooking'], description: 'Fine gram flour for pakoras, sweets and more.',
  },
  {
    id: 49, name: 'Poha (Flattened Rice)', category: 'atta-rice', subcategory: 'poha',
    price: 55, mrp: 65, discount: 15, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
    brand: 'Local Farm', inStock: true, rating: 4.2, reviews: 89,
    tags: ['breakfast', 'staple'], description: 'Light and fluffy flattened rice for breakfast.',
  },
  // More cooking oil
  {
    id: 50, name: 'Fortune Mustard Oil', category: 'cooking-oil', subcategory: 'mustard-oil',
    price: 179, mrp: 200, discount: 11, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&q=80',
    brand: 'Fortune', inStock: true, rating: 4.3, reviews: 267,
    tags: ['pungent', 'cooking'], description: 'Pure mustard oil with authentic pungent flavor.',
    isBestSeller: true
  },
  {
    id: 51, name: 'Figaro Olive Oil', category: 'cooking-oil', subcategory: 'olive-oil',
    price: 449, mrp: 500, discount: 10, weight: '500', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&q=80',
    brand: 'Figaro', inStock: true, rating: 4.6, reviews: 189,
    tags: ['premium', 'heart-healthy'], description: 'Extra virgin olive oil, perfect for salads and cooking.',
    isFeatured: true
  },
  // More beverages
  {
    id: 52, name: 'Real Fruit Power Juice', category: 'beverages', subcategory: 'juice',
    price: 110, mrp: 130, discount: 15, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80',
    brand: 'Real', inStock: true, rating: 4.4, reviews: 234,
    tags: ['mixed-fruit', 'vitamin-c'], description: 'Real mixed fruit juice with no added color.',
    isNew: true
  },
  {
    id: 53, name: 'Sprite', category: 'beverages', subcategory: 'soft-drinks',
    price: 45, mrp: 50, discount: 10, weight: '750', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    brand: 'Sprite', inStock: true, rating: 4.2, reviews: 189,
    tags: ['cold-drink', 'lemon'], description: 'Crisp, refreshing lemon-lime soda.',
  },
  {
    id: 54, name: 'Cadbury Bournvita', category: 'beverages', subcategory: 'health-drink',
    price: 249, mrp: 280, discount: 11, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=80',
    brand: 'Cadbury', inStock: true, rating: 4.6, reviews: 456,
    tags: ['health-drink', 'kids'], description: 'Chocolate malt health drink for growing kids.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 55, name: 'Lipton Green Tea', category: 'beverages', subcategory: 'tea',
    price: 179, mrp: 200, discount: 11, weight: '100', unit: 'g',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    brand: 'Lipton', inStock: true, rating: 4.5, reviews: 312,
    tags: ['antioxidant', 'healthy'], description: 'Refreshing green tea rich in antioxidants.',
    isOrganic: true, isTrending: true
  },
  {
    id: 56, name: 'Frooti Mango Drink', category: 'beverages', subcategory: 'juice',
    price: 40, mrp: 45, discount: 11, weight: '600', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&q=80',
    brand: 'Frooti', inStock: true, rating: 4.3, reviews: 278,
    tags: ['mango', 'kids'], description: 'The fresh and juicy mango drink everyone loves.',
    isBestSeller: true
  },
  // More snacks
  {
    id: 57, name: "Kurkure Masala Munch", category: 'snacks', subcategory: 'chips',
    price: 20, mrp: 20, discount: 0, weight: '55', unit: 'g',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80',
    brand: 'Kurkure', inStock: true, rating: 4.4, reviews: 534,
    tags: ['spicy', 'crunchy'], description: 'Crunchy corn puffs with a masala twist.',
    isBestSeller: true
  },
  {
    id: 58, name: 'Oreo Chocolate Cookies', category: 'snacks', subcategory: 'biscuits',
    price: 30, mrp: 35, discount: 14, weight: '120', unit: 'g',
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&q=80',
    brand: 'Oreo', inStock: true, rating: 4.7, reviews: 678,
    tags: ['chocolate', 'kids'], description: 'Chocolate sandwich cookies with cream filling.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 59, name: 'Maggi 2-Minute Noodles', category: 'snacks', subcategory: 'noodles',
    price: 56, mrp: 60, discount: 7, weight: '280', unit: 'g',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80',
    brand: 'Maggi', inStock: true, rating: 4.7, reviews: 1456,
    tags: ['instant', 'kids'], description: "India's favorite 2-minute instant noodles.",
    isBestSeller: true, isFeatured: true
  },
  {
    id: 60, name: 'Sunfeast Good Day Cookies', category: 'snacks', subcategory: 'biscuits',
    price: 35, mrp: 40, discount: 13, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
    brand: 'Sunfeast', inStock: true, rating: 4.4, reviews: 289,
    tags: ['tea-time', 'butter'], description: 'Rich butter cookies, perfect with tea.',
    isNew: true
  },
  {
    id: 61, name: 'Bingo Mad Angles', category: 'snacks', subcategory: 'chips',
    price: 20, mrp: 20, discount: 0, weight: '72', unit: 'g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80',
    brand: 'Bingo', inStock: true, rating: 4.3, reviews: 245,
    tags: ['spicy', 'crispy'], description: 'Triangular crispy snacks with bold flavors.',
  },
  // More household
  {
    id: 62, name: 'Harpic Toilet Cleaner', category: 'household', subcategory: 'toilet-cleaner',
    price: 99, mrp: 115, discount: 13, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
    brand: 'Harpic', inStock: true, rating: 4.5, reviews: 389,
    tags: ['disinfectant', 'cleaning'], description: 'Powerful toilet cleaner that kills 99.9% germs.',
    isBestSeller: true
  },
  {
    id: 63, name: 'Colin Glass Cleaner', category: 'household', subcategory: 'glass-cleaner',
    price: 89, mrp: 99, discount: 10, weight: '500', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&q=80',
    brand: 'Colin', inStock: true, rating: 4.3, reviews: 178,
    tags: ['cleaning', 'sparkle'], description: 'Streak-free shine for glass and mirrors.',
  },
  {
    id: 64, name: 'Odonil Air Freshener', category: 'household', subcategory: 'air-freshener',
    price: 75, mrp: 85, discount: 12, weight: '75', unit: 'g',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400&q=80',
    brand: 'Odonil', inStock: true, rating: 4.2, reviews: 156,
    tags: ['fragrance', 'home'], description: 'Long-lasting fragrance for a fresh home.',
  },
  {
    id: 65, name: 'Good Knight Mosquito Repellent', category: 'household', subcategory: 'insect-repellent',
    price: 65, mrp: 75, discount: 13, weight: '1', unit: 'pc',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=80',
    brand: 'Good Knight', inStock: true, rating: 4.4, reviews: 267,
    tags: ['protection', 'home'], description: 'Effective mosquito repellent for a peaceful night.',
    isBestSeller: true
  },
  // More frozen
  {
    id: 66, name: 'Frozen Green Peas', category: 'frozen', subcategory: 'vegetables',
    price: 79, mrp: 90, discount: 12, weight: '500', unit: 'g',
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=80',
    brand: 'Safal', inStock: true, rating: 4.3, reviews: 198,
    tags: ['frozen', 'quick-cook'], description: 'Farm-fresh green peas, flash frozen for freshness.',
  },
  {
    id: 67, name: 'Amul Vanilla Ice Cream', category: 'frozen', subcategory: 'ice-cream',
    price: 149, mrp: 170, discount: 12, weight: '1', unit: 'L',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&q=80',
    brand: 'Amul', inStock: true, rating: 4.7, reviews: 534,
    tags: ['dessert', 'kids'], description: 'Rich and creamy vanilla ice cream.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 68, name: 'Frozen Malabar Paratha', category: 'frozen', subcategory: 'paratha',
    price: 99, mrp: 115, discount: 13, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    brand: "Baker's Delight", inStock: true, rating: 4.4, reviews: 145,
    tags: ['quick-cook', 'breakfast'], description: 'Flaky layered parathas, ready in minutes.',
    isNew: true
  },
  // Personal Care (new category)
  {
    id: 69, name: 'Dove Beauty Soap', category: 'personal-care', subcategory: 'bath',
    price: 55, mrp: 65, discount: 15, weight: '4', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&q=80',
    brand: 'Dove', inStock: true, rating: 4.6, reviews: 456,
    tags: ['moisturizing', 'daily-essential'], description: 'Moisturizing beauty bar with 1/4 moisturizing cream.',
    isBestSeller: true
  },
  {
    id: 70, name: 'Colgate Toothpaste', category: 'personal-care', subcategory: 'oral-care',
    price: 89, mrp: 100, discount: 11, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
    brand: 'Colgate', inStock: true, rating: 4.7, reviews: 678,
    tags: ['oral-care', 'daily-essential'], description: 'Advanced cavity protection toothpaste.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 71, name: 'Head & Shoulders Shampoo', category: 'personal-care', subcategory: 'hair-care',
    price: 199, mrp: 230, discount: 13, weight: '340', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
    brand: 'Head & Shoulders', inStock: true, rating: 4.5, reviews: 389,
    tags: ['anti-dandruff', 'hair-care'], description: 'Anti-dandruff shampoo for healthy scalp.',
    isTrending: true
  },
  {
    id: 72, name: 'Nivea Body Lotion', category: 'personal-care', subcategory: 'skin-care',
    price: 249, mrp: 280, discount: 11, weight: '400', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
    brand: 'Nivea', inStock: true, rating: 4.6, reviews: 312,
    tags: ['moisturizing', 'skin-care'], description: '48-hour moisture body lotion for soft skin.',
    isFeatured: true
  },
  {
    id: 73, name: 'Gillette Razor', category: 'personal-care', subcategory: 'grooming',
    price: 149, mrp: 170, discount: 12, weight: '1', unit: 'pc',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
    brand: 'Gillette', inStock: true, rating: 4.4, reviews: 234,
    tags: ['grooming', 'men'], description: 'Precision razor for a smooth, comfortable shave.',
    isNew: true
  },
  {
    id: 74, name: 'Himalaya Face Wash', category: 'personal-care', subcategory: 'skin-care',
    price: 129, mrp: 150, discount: 14, weight: '150', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
    brand: 'Himalaya', inStock: true, rating: 4.5, reviews: 267,
    tags: ['herbal', 'skin-care'], description: 'Purifying neem face wash for clear skin.',
    isOrganic: true, isBestSeller: true
  },
  {
    id: 75, name: 'Dettol Hand Sanitizer', category: 'personal-care', subcategory: 'hygiene',
    price: 89, mrp: 100, discount: 11, weight: '200', unit: 'ml',
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&q=80',
    brand: 'Dettol', inStock: true, rating: 4.6, reviews: 445,
    tags: ['hygiene', 'protection'], description: 'Kills 99.9% germs, keeps hands protected.',
    isBestSeller: true
  },
  // Baby Care (new category)
  {
    id: 76, name: 'Pampers Baby Diapers', category: 'baby-care', subcategory: 'diapers',
    price: 549, mrp: 620, discount: 11, weight: '42', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80',
    brand: 'Pampers', inStock: true, rating: 4.7, reviews: 512,
    tags: ['baby', 'daily-essential'], description: '12-hour protection diapers for happy babies.',
    isBestSeller: true, isFeatured: true
  },
  {
    id: 77, name: "Johnson's Baby Powder", category: 'baby-care', subcategory: 'skin-care',
    price: 175, mrp: 199, discount: 12, weight: '400', unit: 'g',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80',
    brand: "Johnson's", inStock: true, rating: 4.6, reviews: 345,
    tags: ['baby', 'gentle'], description: 'Gentle baby powder for soft, fresh skin.',
  },
  {
    id: 78, name: 'Baby Wipes (Pack of 80)', category: 'baby-care', subcategory: 'wipes',
    price: 199, mrp: 225, discount: 12, weight: '80', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80',
    brand: 'Pampers', inStock: true, rating: 4.5, reviews: 289,
    tags: ['baby', 'hygiene'], description: 'Soft and gentle wipes for delicate baby skin.',
    isNew: true
  },
  {
    id: 79, name: 'Nestle Cerelac', category: 'baby-care', subcategory: 'baby-food',
    price: 245, mrp: 275, discount: 11, weight: '300', unit: 'g',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80',
    brand: 'Nestle', inStock: true, rating: 4.5, reviews: 234,
    tags: ['baby', 'nutrition'], description: 'Nutritious baby cereal with essential vitamins.',
    isFeatured: true
  },
  // Cleaning (new category)
  {
    id: 80, name: 'Scotch-Brite Scrub Pad', category: 'cleaning', subcategory: 'scrub',
    price: 45, mrp: 55, discount: 18, weight: '3', unit: 'pcs',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    brand: 'Scotch-Brite', inStock: true, rating: 4.4, reviews: 312,
    tags: ['kitchen', 'cleaning'], description: 'Durable scrub pads for tough kitchen stains.',
    isBestSeller: true
  },
  {
    id: 81, name: 'Exo Dishwash Bar', category: 'cleaning', subcategory: 'dishwash',
    price: 20, mrp: 25, discount: 20, weight: '200', unit: 'g',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80',
    brand: 'Exo', inStock: true, rating: 4.2, reviews: 178,
    tags: ['kitchen', 'grease-remover'], description: 'Effective dishwash bar that cuts through grease.',
  },
  {
    id: 82, name: 'Cleaning Rubber Gloves', category: 'cleaning', subcategory: 'gloves',
    price: 65, mrp: 75, discount: 13, weight: '1', unit: 'pair',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80',
    brand: 'Tuffy', inStock: true, rating: 4.1, reviews: 98,
    tags: ['protection', 'cleaning'], description: 'Durable rubber gloves for safe cleaning.',
  },
  {
    id: 83, name: 'Spin Mop with Bucket', category: 'cleaning', subcategory: 'mop',
    price: 899, mrp: 1099, discount: 18, weight: '1', unit: 'set',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80',
    brand: 'Gala', inStock: true, rating: 4.5, reviews: 267,
    tags: ['home', 'floor-cleaning'], description: '360-degree spin mop for effortless floor cleaning.',
    isNew: true, isFeatured: true
  },
];

export const comboOffers = [
  {
    id: 1, name: 'Breakfast Combo', description: 'Bread, Butter, Eggs & Milk',
    itemIds: [14, 10, 30, 9], comboPrice: 199, mrpTotal: 234,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
  },
  {
    id: 2, name: 'Snack Attack Combo', description: "Lay's, Kurkure, Oreo & Coke",
    itemIds: [23, 57, 58, 22], comboPrice: 99, mrpTotal: 125,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80',
  },
  {
    id: 3, name: 'Kitchen Staples Combo', description: 'Atta, Rice, Oil & Sugar',
    itemIds: [16, 17, 18, 47], comboPrice: 649, mrpTotal: 745,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80',
  },
  {
    id: 4, name: 'Chai Time Combo', description: 'Tea, Milk, Sugar & Parle-G',
    itemIds: [20, 9, 47, 24], comboPrice: 219, mrpTotal: 260,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80',
  },
];

export const testimonials = [
  {
    id: 1, name: 'Priya Sharma', location: 'Koramangala, Bengaluru', rating: 5,
    comment: 'Kwikr has completely changed how I shop for groceries. Fresh produce delivered in literally 8 minutes!',
  },
  {
    id: 2, name: 'Rahul Verma', location: 'Indiranagar, Bengaluru', rating: 5,
    comment: 'The quality is always top-notch and the app is super easy to use. My go-to for daily essentials now.',
  },
  {
    id: 3, name: 'Ananya Iyer', location: 'HSR Layout, Bengaluru', rating: 4,
    comment: 'Love the combo offers and how fast the delivery is. Occasionally an item is out of stock but overall great.',
  },
  {
    id: 4, name: 'Vikram Singh', location: 'Whitefield, Bengaluru', rating: 5,
    comment: 'Best prices compared to other apps, and the 10-minute delivery promise actually holds true!',
  },
  {
    id: 5, name: 'Sneha Reddy', location: 'Jayanagar, Bengaluru', rating: 5,
    comment: 'Their fruits and vegetables are always fresh. Customer support is responsive too.',
  },
  {
    id: 6, name: 'Arjun Nair', location: 'BTM Layout, Bengaluru', rating: 4,
    comment: 'Great range of household essentials at good prices. The app UI is clean and easy to navigate.',
  },
];

export const faqs = [
  {
    question: 'How does 10-minute delivery work?',
    answer: 'We stock our dark stores close to your neighborhood with the most-ordered products, allowing our delivery partners to reach you in as fast as 10 minutes from order confirmation.',
  },
  {
    question: 'What are your delivery charges?',
    answer: 'Delivery is free on orders above ₹199. For orders below that, a small delivery fee of ₹25 applies, shown clearly at checkout before you pay.',
  },
  {
    question: 'Can I return or replace a product?',
    answer: 'Yes, if you receive a damaged, expired, or incorrect item, you can request a replacement or refund within 24 hours of delivery from the Orders section.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, credit/debit cards, net banking, popular wallets, and Cash on Delivery (COD) for your convenience.',
  },
  {
    question: 'Which areas do you currently deliver to?',
    answer: 'We currently deliver across Bengaluru, including Koramangala, Indiranagar, Jayanagar, HSR Layout, Whitefield, Electronic City, Marathahalli, and BTM Layout, with more areas being added every month.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is placed, you can track it in real time from the Orders section, including live delivery partner location during the final stretch.',
  },
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getDailyEssentials = () => products.filter(p => p.tags.includes('daily-essential'));
export const getFreshProduce = () => products.filter(p => p.category === 'fruits-vegetables');
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getTrendingProducts = () => products.filter(p => p.isTrending);
export const getTopRatedProducts = () => products.filter(p => p.rating >= 4.6).sort((a, b) => b.rating - a.rating);
export const getOrganicProducts = () => products.filter(p => p.isOrganic);
export const brands = [...new Set(products.map(p => p.brand))];
