import { atom } from "jotai";

const initialValue = [
  {
    id: 1,
    name: "Mie Babi Pangsit",
    description:
      "Mi khas am.pm dengan topping pangsit babi, daging babi, dan kuah kaldu babi",
    price: 18000,
    category: "makanan",
    image: "/images/menu/mie-babi-pangsit.jpg",
  },
  {
    id: 2,
    name: "Mie Babi Bakso",
    description:
      "Mi khas am.pm dengan topping bakso, daging babi, dan kuah kaldu babi",
    price: 18000,
    category: "makanan",
    image: "/images/menu/mie-babi-bakso.jpg",
  },
  {
    id: 3,
    name: "Mie Babi Komplit",
    description:
      "Mi khas am.pm dengan topping pangsit babi, bakso, daging babi, dan kuah kaldu babi",
    price: 22000,
    category: "makanan",
    image: "/images/menu/mie-babi-komplit.jpg",
  },
  {
    id: 4,
    name: "Mie Kuah Bakso",
    description: "Mi dengan kuah kaldu babi, topping bakso, dan daging babi",
    price: 18000,
    category: "makanan",
    image: "/images/menu/mie-kuah-bakso.jpg",
  },
  {
    id: 5,
    name: "Mie Kuah Pangsit",
    description:
      "Mi dengan kuah kaldu babi, topping pangsit babi, dan daging babi",
    price: 16000,
    category: "makanan",
    image: "/images/menu/mie-kuah-pangsit.jpg",
  },
  {
    id: 6,
    name: "Nasi Babi Goreng",
    description:
      "Nasi dengan babi goreng, didampingi dengan sayuran dan kuah kaldu babi",
    price: 25000,
    category: "makanan",
    image: "/images/menu/nasi-babi-goreng.jpg",
  },
  {
    id: 7,
    name: "Nasi Babi Goreng Jumbo",
    description:
      "Nasi dengan porsi babi goreng lebih banyak, didampingi dengan sayuran dan kuah kaldu babi",
    price: 45000,
    category: "makanan",
    image: "/images/menu/nasi-babi-goreng.jpg",
  },
  {
    id: 8,
    name: "Nasi Goreng",
    description:
      "Nasi goreng dengan topping bakso, sosis, telur (dadar/mata sapi)",
    price: 18000,
    category: "makanan",
    image: "/images/menu/nasi-goreng.jpg",
  },
  {
    id: 9,
    name: "Pangsit Kuah",
    description: "Kuah kaldu babi dengan isi pangsit 7 buah",
    price: 12000,
    category: "makanan",
    image: "",
  },
  {
    id: 10,
    name: "Mie Goreng",
    description:
      "Mi goreng dengan topping bakso, sosis, telur (dadar/mata sapi)",
    price: 18000,
    category: "makanan",
    image: "/images/menu/mie-goreng.jpg",
  },
  {
    id: 11,
    name: "Bakso",
    description: "Kuah kaldu babi dengan isi bakso 5 buah",
    price: 12000,
    category: "makanan",
    image: "",
  },
  {
    id: 12,
    name: "Teh Manis",
    description: "",
    price: 5000,
    category: "minuman",
    image: "/images/menu/teh-manis.jpg",
  },
  {
    id: 13,
    name: "Es Joshua",
    description: "",
    price: 5000,
    category: "minuman",
    image: "/images/menu/es-joshua.jpg",
  },
  {
    id: 14,
    name: "Es Sirup",
    description: "",
    price: 5000,
    category: "minuman",
    image: "/images/menu/es-sirup.jpg",
  },
  {
    id: 15,
    name: "Es Nutrisari",
    description: "",
    price: 5000,
    category: "minuman",
    image: "/images/menu/es-nutrisari.jpg",
  },
  {
    id: 16,
    name: "Es Jeruk",
    description: "",
    price: 8000,
    category: "minuman",
    image: "/images/menu/es-jeruk.jpg",
  },
  {
    id: 17,
    name: "Es Soda Gembira",
    description: "",
    price: 15000,
    category: "minuman",
    image: "/images/menu/es-soda-gembira.jpg",
  },
  {
    id: 18,
    name: "Es Campur",
    description: "",
    price: 12000,
    category: "minuman",
    image: "/images/menu/es-campur.jpg",
  },
  {
    id: 19,
    name: "Es Kacang Hijau",
    description: "",
    price: 12000,
    category: "minuman",
    image: "/images/menu/es-kacang-hijau.jpg",
  },
  {
    id: 20,
    name: "Nasi Putih",
    description: "",
    price: 5000,
    category: "tambahan",
    image: "",
  },
  {
    id: 21,
    name: "Extra Mie",
    description: "Tambahan mie",
    price: 7000,
    category: "tambahan",
    image: "",
  },
  {
    id: 22,
    name: "Extra Daging",
    description: "Tambahan topping daging babi",
    price: 8000,
    category: "tambahan",
    image: "",
  },
  {
    id: 23,
    name: "Extra bakso",
    description: "Harga per biji",
    price: 2500,
    category: "tambahan",
    image: "",
  },
  {
    id: 24,
    name: "Extra pangsit",
    description: "Harga per biji",
    price: 1500,
    category: "tambahan",
    image: "",
  },
  {
    id: 25,
    name: "Extra Babi Goreng",
    description: "",
    price: 22000,
    category: "tambahan",
    image: "",
  },
] as MenuItem[];
export const menuAtom = atom(initialValue);
