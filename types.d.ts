interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "makanan" | "minuman" | "tambahan";
}

interface CartItem {
  id: number;
  menu: MenuItem;
  qty: number;
  notes: string;
}
