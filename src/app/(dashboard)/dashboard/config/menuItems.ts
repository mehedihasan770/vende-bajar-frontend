import { 
  LayoutDashboard, Users, ShoppingBag, Settings, Package, 
  DollarSign, Heart, MapPin, CreditCard, Star, Store, Ticket, 
  TrendingUp, Headset, Truck, FileText, Bell, Activity, ShieldCheck, RefreshCcw, UserCheck, BarChart3, Lock, UserMinus
} from 'lucide-react';

export const MENU_ITEMS = {
  ADMIN: [
    {
      category: "Main",
      items: [
        { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
      ]
    },
    {
      category: "Management",
      items: [
        { name: 'Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'Vendors', href: '/dashboard/admin/vendors', icon: Store },
        { name: 'Customers', href: '/dashboard/admin/customers', icon: UserCheck },
      ]
    },
    {
      category: "Catalog & Sales",
      items: [
        { name: 'Products', href: '/dashboard/admin/products', icon: Package },
        { name: 'Categories', href: '/dashboard/admin/categories', icon: Package },
        { name: 'Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
        { name: 'Returns', href: '/dashboard/admin/returns', icon: RefreshCcw },
        { name: 'Coupons', href: '/dashboard/admin/coupons', icon: Ticket },
      ]
    },
    {
      category: "Financials",
      items: [
        { name: 'Finance', href: '/dashboard/admin/transactions', icon: CreditCard },
        { name: 'Shipping', href: '/dashboard/admin/shipping', icon: Truck },
      ]
    },
    {
      category: "Content & Support",
      items: [
        { name: 'Pages', href: '/dashboard/admin/pages', icon: FileText },
        { name: 'Reviews', href: '/dashboard/admin/reviews', icon: Star },
        { name: 'Support', href: '/dashboard/admin/support', icon: Headset },
      ]
    },
    {
      category: "System",
      items: [
        { name: 'Notifications', href: '/dashboard/admin/notifications', icon: Bell },
        { name: 'Activity', href: '/dashboard/admin/activity-log', icon: Activity },
        { name: 'System', href: '/dashboard/admin/monitoring', icon: ShieldCheck },
        { name: 'Settings', href: '/dashboard/admin/settings/general', icon: Settings },
      ]
    }
  ],
  VENDOR: [
    {
      category: "Main",
      items: [
        { name: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
        { name: 'Sales Overview', href: '/dashboard/vendor/sales-overview', icon: TrendingUp },
        { name: 'Analytics', href: '/dashboard/vendor/analytics', icon: BarChart3 },
      ]
    },
    {
      category: "Catalog",
      items: [
        { name: 'Products', href: '/dashboard/vendor/products', icon: Package },
        { name: 'Orders', href: '/dashboard/vendor/orders', icon: ShoppingBag },
        { name: 'Reviews', href: '/dashboard/vendor/reviews', icon: Star },
      ]
    },
    {
      category: "Support & Account",
      items: [
        { name: 'Support', href: '/dashboard/vendor/support', icon: Headset },
        { name: 'Notifications', href: '/dashboard/vendor/notifications', icon: Bell },
        { name: 'Activity', href: '/dashboard/vendor/activity-history', icon: Activity },
        { name: 'Profile', href: '/dashboard/vendor/profile', icon: UserCheck },
      ]
    }
  ],
  USER: [
    {
      category: "Main",
      items: [
        { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
        { name: 'Wishlist', href: '/dashboard/user/wishlist', icon: Heart },
        { name: 'Coupons', href: '/dashboard/user/coupons', icon: Ticket },
      ]
    },
    {
      category: "Shopping",
      items: [
        { name: 'Orders', href: '/dashboard/user/orders', icon: ShoppingBag },
        { name: 'Returns', href: '/dashboard/user/returns', icon: RefreshCcw },
      ]
    },
    {
      category: "Social & Support",
      items: [
        { name: 'Reviews', href: '/dashboard/user/reviews', icon: Star },
        { name: 'Support', href: '/dashboard/user/support', icon: Headset },
        { name: 'Notifications', href: '/dashboard/user/notifications', icon: Bell },
      ]
    },
    {
      category: "Account",
      items: [
        { name: 'Profile', href: '/dashboard/user/profile', icon: Users },
        { name: 'Addresses', href: '/dashboard/user/addresses', icon: MapPin },
        { name: 'Payments', href: '/dashboard/user/payments', icon: CreditCard },
      ]
    }
  ]
};
