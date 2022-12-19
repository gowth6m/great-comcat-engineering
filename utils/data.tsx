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

export type SampleDataType = {
  products: ProductDataType[];
};

const data: SampleDataType = {
  products: [
    {
      name: "Free Shirt",
      slug: "free-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Fit Shirt",
      slug: "fit-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 170,
      brand: "Addidas",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Big Shirt",
      slug: "big-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 90,
      brand: "Big",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Free Shirt",
      slug: "slim-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 702,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Fit Shirt",
      slug: "med-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 170,
      brand: "Addidas",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Big Shirt",
      slug: "anime-shirt",
      category: "Shirts",
      image: "https://picsum.photos/200",
      price: 990,
      brand: "Yig",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
  ],
};

export default data;
