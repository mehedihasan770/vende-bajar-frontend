import { 
  LayoutDashboard, Users, ShoppingBag, Settings, Package, 
  DollarSign, Heart, MapPin, CreditCard, Star, Store, Ticket, 
  TrendingUp, Headset 
} from 'lucide-react';

export const MENU_ITEMS = {
  ADMIN: [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Role Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Verify Vendors', href: '/dashboard/admin/vendors', icon: Store },
    { name: 'Master Products', href: '/dashboard/admin/products', icon: Package },
    { name: 'Master Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
    { name: 'Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
    { name: 'Categories', href: '/dashboard/admin/categories', icon: Package },
    { name: 'Coupons', href: '/dashboard/admin/coupons', icon: Ticket },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
    { name: 'Review Support', href: '/dashboard/admin/support', icon: Headset },
    { name: 'Reviews', href: '/dashboard/admin/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
  VENDOR: [
    { name: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
    { name: 'Add New Product', href: '/dashboard/vendor/products/add', icon: Package },
    { name: 'My Products', href: '/dashboard/vendor/products', icon: Package },
    { name: 'Orders Management', href: '/dashboard/vendor/orders', icon: ShoppingBag },
    { name: 'Earnings', href: '/dashboard/vendor/earnings', icon: DollarSign },
    { name: 'Payouts', href: '/dashboard/vendor/payouts', icon: CreditCard },
    { name: 'Coupons', href: '/dashboard/vendor/coupons', icon: Ticket },
    { name: 'Shop Settings', href: '/dashboard/vendor/settings', icon: Settings },
  ],
  USER: [
    { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
    { name: 'My Profile', href: '/dashboard/user/profile', icon: Users },
    { name: 'My Orders', href: '/dashboard/user/orders', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/user/wishlist', icon: Heart },
    { name: 'Addresses', href: '/dashboard/user/addresses', icon: MapPin },
    { name: 'Reviews', href: '/dashboard/user/reviews', icon: Star },
    { name: 'Payments', href: '/dashboard/user/payments', icon: CreditCard },
  ]
};
