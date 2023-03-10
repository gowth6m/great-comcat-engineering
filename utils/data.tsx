// import bcrypt from "bcryptjs";

var bcrypt = require('bcryptjs');

export type ProductDataType = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
};

export type UserDataType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type SampleDataType = {
  users: UserDataType[];
  products: ProductDataType[];
};

const data: SampleDataType = {
  users: [
    {
      name: "Admin",
      email: "admin@nocxa.com",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: true,
    },
    {
      name: "Gowthaman Ravindrathas",
      email: "contact@gowtham.co.uk",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
    {
      name: "Jathu Ravindrathas",
      email: "contact@jathugoban.com",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
    {
      name: "Manu Ravindrathas",
      email: "contact@manusha.dev",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Machine 1",
      slug: "machine-1",
      category: "Chicken Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine that makes chicken",
    },
    {
      name: "Machine 2",
      slug: "machine-2-the-sequel",
      category: "Chicken Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 170,
      brand: "Mango",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine",
    },
    {
      name: "Machine 3",
      slug: "machine-3-the-return-of-the-sequel",
      category: "Chicken Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 90,
      brand: "Big",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine for making chicken",
    },
    {
      name: "Machine 4",
      slug: "machine-4-the-return-of-the-sequel-2",
      category: "Beef Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 702,
      brand: "Big",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular chicken machine",
    },
    {
      name: "Machine 5",
      slug: "machine-5-the-return-of-the-sequel-3",
      category: "Beef Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/TO4502-1200x1200.jpg",
      price: 170,
      brand: "Big Chicken",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A free chicken machine",
    },
    {
      name: "Machine 6",
      slug: "machine-6-the-return-of-the-sequel-3",
      category: "Beef Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/ST145BR-1200x1200.jpg",
      price: 990,
      brand: "Yige",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular and expensive machine for making big chicken",
    },
    {
      name: "Machine 7",
      slug: "machine-7-the-return-of-the-sequel-2",
      category: "Beef Machine",
      image: "https://adexa.co.uk/image/cache/catalog/Adexa/PFE800-N-1200x1200.jpg",
      price: 7202,
      brand: "Big",
      rating: 2.5,
      numReviews: 81,
      countInStock: 3,
      description: "A popular top chicken machine",
    },
  ],
};

export default data;
